import bcrypt from "bcrypt";
import db from "../config/db.js";
import jsonwebtoken from "jsonwebtoken";

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const userRole = role || "user";
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "username and password are required",
    });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const query =
    "INSERT INTO users (username, password, role) VALUES ( ?, ?, ?)";
  db.run(query, [username, hashpassword, userRole], (err) => {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(409).json({
          success: false,
          error: "username already taken",
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Internal error",
        });
      }
    }
    return res.status(201).json({
      success: true,
      message: "User successfully created",
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  db.get(query, [username], async (err, row) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Internal Error",
      });
    }
    if (!row) {
      return res.status(401).json({
        success: false,
        error: "invalid credentials",
      });
    }
    const esito = await bcrypt.compare(password, row.password);
    if (!esito) {
      return res.status(401).json({
        success: false,
        errorr: "invalid credentials",
      });
    }
    const jwt = jsonwebtoken.sign(
      {
        id: row.id,
        username: row.username,
        role: row.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      },
    );
    return res.status(200).json({
      success: true,
      data: {
        token: jwt,
      },
    });
  });
};

export { register, login };
