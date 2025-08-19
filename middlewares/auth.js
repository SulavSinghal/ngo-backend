const jwt = require('jsonwebtoken');

// Single, consistent auth middleware for verifying Bearer tokens
module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization') || req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
