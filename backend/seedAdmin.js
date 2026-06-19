require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("./src/config/db");

async function seedAdmin() {
  try {
    const email = "admin@gmail.com";

    const existingAdmin = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingAdmin.rows.length > 0) {
      console.log("Admin already exists");
      process.exit();
    }

    const password = await bcrypt.hash("admin123", 10);

    await pool.query(
      `
      INSERT INTO users(
      fullname,
      email,
      password,
      role
      )
      VALUES($1,$2,$3,$4)
      `,
      ["System Administrator", email, password, "ADMIN"],
    );

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();
