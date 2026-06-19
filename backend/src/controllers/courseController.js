const pool = require("../config/db");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { course_code, course_title, unit, semester, level } = req.body;

    const existingCourse = await pool.query(
      "SELECT * FROM courses WHERE course_code = $1",
      [course_code],
    );

    if (existingCourse.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Course code already exists",
      });
    }

    const course = await pool.query(
      `
      INSERT INTO courses(
        course_code,
        course_title,
        unit,
        semester,
        level
      )
      VALUES($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [course_code, course_title, unit, semester, level],
    );

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await pool.query(
      `
      SELECT *
      FROM courses
      ORDER BY course_code ASC
      `,
    );

    res.json({
      success: true,
      count: courses.rows.length,
      data: courses.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Course
exports.getCourse = async (req, res) => {
  try {
    const course = await pool.query(
      `
      SELECT *
      FROM courses
      WHERE id = $1
      `,
      [req.params.id],
    );

    if (course.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { course_code, course_title, unit, semester, level } = req.body;

    const course = await pool.query(
      `
      UPDATE courses
      SET
        course_code=$1,
        course_title=$2,
        unit=$3,
        semester=$4,
        level=$5
      WHERE id=$6
      RETURNING *
      `,
      [course_code, course_title, unit, semester, level, req.params.id],
    );

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    await pool.query(
      `
      DELETE FROM courses
      WHERE id = $1
      `,
      [req.params.id],
    );

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
