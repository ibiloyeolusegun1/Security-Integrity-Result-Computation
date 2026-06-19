const pool = require("../config/db");

exports.getLogs = async (req, res) => {
  try {
    const logs = await pool.query(
      `
      SELECT
      a.*,
      u.fullname

      FROM audit_logs a

      LEFT JOIN users u
      ON a.user_id=u.id

      ORDER BY a.created_at DESC
      `,
    );

    res.json({
      success: true,
      data: logs.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
