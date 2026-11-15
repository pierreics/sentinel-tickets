import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({
      success: false,
      error: "unauthorized",
    });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "unauthorized",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: "unauthorized",
      });
    }
    req.user = decoded;
    next();
  });
}

export { verifyToken };
