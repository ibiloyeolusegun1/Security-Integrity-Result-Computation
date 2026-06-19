const pool = require("../config/db");

const createAuditLog = async (userId, action, description) => {
  await pool.query(
    `
    INSERT INTO audit_logs(
      user_id,
      action,
      description
    )
    VALUES($1,$2,$3)
    `,
    [userId, action, description],
  );
};

module.exports = createAuditLog;
