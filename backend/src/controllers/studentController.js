const pool = require("../config/db");

exports.createStudent = async (req, res) => {
  try {
    const { matric_no, fullname, department, level } = req.body;

    const student = await pool.query(
      `
      INSERT INTO students(
        matric_no,
        fullname,
        department,
        level
      )
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [matric_no, fullname, department, level],
    );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await pool.query(
      `
      SELECT *
      FROM students
      ORDER BY id DESC
      `,
    );

    res.json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await pool.query(
      `
      SELECT *
      FROM students
      WHERE id = $1
      `,
      [req.params.id],
    );

    if (student.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      data: student.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { matric_no, fullname, department, level } = req.body;

    const student = await pool.query(
      `
      UPDATE students
      SET
      matric_no=$1,
      fullname=$2,
      department=$3,
      level=$4
      WHERE id=$5
      RETURNING *
      `,
      [matric_no, fullname, department, level, req.params.id],
    );

    res.json({
      success: true,
      message: "Student updated",
      data: student.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await pool.query(
      `
      DELETE FROM students
      WHERE id = $1
      `,
      [req.params.id],
    );

    res.json({
      success: true,
      message: "Student deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
