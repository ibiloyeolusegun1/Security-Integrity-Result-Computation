const pool = require("../config/db");
const calculateGrade = require("../services/gradeService");
const generateHash = require("../services/hashService");
const createAuditLog = require("../services/auditService");

exports.computeResult = async (req, res) => {
  try {
    const { student_id, course_id, ca_score, test_score, exam_score } =
      req.body;

    // verify student
    const student = await pool.query("SELECT * FROM students WHERE id=$1", [
      student_id,
    ]);

    if (student.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // verify course
    const course = await pool.query("SELECT * FROM courses WHERE id=$1", [
      course_id,
    ]);

    await createAuditLog(
      req.user.id,
      "RESULT_COMPUTED",
      `Computed result for Student ${student_id}`,
    );

    if (course.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // total score
    const totalScore =
      Number(ca_score) + Number(test_score) + Number(exam_score);

    const { grade, point } = calculateGrade(totalScore);

    const qualityPoint = Number(course.rows[0].unit) * point;

    // generate security hash
    const hash = generateHash(
      `${student_id}-${course_id}-${totalScore}-${grade}-${point}`,
    );

    const result = await pool.query(
      `
      INSERT INTO results(
        student_id,
        course_id,
        ca_score,
        test_score,
        exam_score,
        total_score,
        grade,
        grade_point,
        quality_point,
        hash_value
      )
      VALUES(
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
      )
      RETURNING *
      `,
      [
        student_id,
        course_id,
        ca_score,
        test_score,
        exam_score,
        totalScore,
        grade,
        point,
        qualityPoint,
        hash,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Result computed successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getStudentResults = async (req, res) => {
  try {
    const results = await pool.query(
      `
      SELECT
      r.*,
      s.fullname,
      s.matric_no,
      c.course_code,
      c.course_title,
      c.unit

      FROM results r

      JOIN students s
      ON r.student_id = s.id

      JOIN courses c
      ON r.course_id = c.id

      WHERE student_id = $1

      ORDER BY c.course_code
      `,
      [req.params.studentId],
    );

    res.json({
      success: true,
      count: results.rows.length,
      data: results.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.verifyResult = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM results
      WHERE id = $1
      `,
      [req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    const record = result.rows[0];

    const newHash = generateHash(
      `${record.student_id}-${record.course_id}-${record.total_score}-${record.grade}-${record.grade_point}`,
    );

    const integrity = newHash === record.hash_value;

    res.json({
      success: true,
      integrity,
      status: integrity ? "VALID" : "COMPROMISED",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.calculateGPA = async (req, res) => {
  try {
    const { studentId } = req.params;

    const { session, semester } = req.query;

    const result = await pool.query(
      `
      SELECT
        SUM(r.quality_point) AS total_quality_points,
        SUM(c.unit) AS total_units

      FROM results r

      JOIN courses c
      ON r.course_id = c.id

      WHERE
        r.student_id = $1
        AND r.session = $2
        AND r.semester = $3
      `,
      [studentId, session, semester],
    );

    const qualityPoints = Number(result.rows[0].total_quality_points) || 0;

    const totalUnits = Number(result.rows[0].total_units) || 0;

    const gpa = totalUnits === 0 ? 0 : (qualityPoints / totalUnits).toFixed(2);

    res.json({
      success: true,
      student_id: studentId,
      session,
      semester,
      total_units: totalUnits,
      total_quality_points: qualityPoints,
      gpa,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.calculateCGPA = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `
      SELECT
        SUM(quality_point)
        AS total_quality_points,

        COUNT(*)
      FROM results

      WHERE student_id = $1
      `,
      [studentId],
    );

    const unitsResult = await pool.query(
      `
        SELECT
          SUM(c.unit)
          AS total_units

        FROM results r

        JOIN courses c
        ON r.course_id = c.id

        WHERE r.student_id = $1
        `,
      [studentId],
    );

    const qualityPoints = Number(result.rows[0].total_quality_points) || 0;

    const totalUnits = Number(unitsResult.rows[0].total_units) || 0;

    const cgpa = totalUnits === 0 ? 0 : (qualityPoints / totalUnits).toFixed(2);

    res.json({
      success: true,
      student_id: studentId,
      total_units: totalUnits,
      total_quality_points: qualityPoints,
      cgpa,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getTranscript = async (req, res) => {
  try {
    const { studentId } = req.params;

    const transcript = await pool.query(
      `
        SELECT

        c.course_code,
        c.course_title,
        c.unit,

        r.ca_score,
        r.test_score,
        r.exam_score,

        r.total_score,
        r.grade,
        r.grade_point,
        r.quality_point,

        r.session,
        r.semester

        FROM results r

        JOIN courses c
        ON r.course_id = c.id

        WHERE r.student_id = $1

        ORDER BY
        r.session,
        r.semester
        `,
      [studentId],
    );

    res.json({
      success: true,
      count: transcript.rows.length,
      data: transcript.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const students = await pool.query("SELECT COUNT(*) FROM students");

    const courses = await pool.query("SELECT COUNT(*) FROM courses");

    const results = await pool.query("SELECT COUNT(*) FROM results");

    const averageCGPA = await pool.query(`
        SELECT
        ROUND(
          AVG(grade_point),
          2
        )
        AS avg_cgpa

        FROM results
      `);

    res.json({
      success: true,

      stats: {
        students: students.rows[0].count,

        courses: courses.rows[0].count,

        results: results.rows[0].count,

        average_cgpa: averageCGPA.rows[0].avg_cgpa,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
