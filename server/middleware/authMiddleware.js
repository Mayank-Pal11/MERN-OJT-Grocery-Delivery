const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // If the Authorization header is missing
    if (!authHeader) {
      return res.status(401).json({
        message: 'Not authorized. No token provided.'
      });
    }

    // If the header exists but does not start with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Not authorized. Invalid token format.'
      });
    }

    // Extract the token after "Bearer "
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to req.user
    req.user = decoded;

    // Move to the next middleware/route handler
    next();
  } catch (error) {
    // If jwt.verify() throws an error (invalid or expired)
    return res.status(401).json({
      message: 'Not authorized. Invalid or expired token.'
    });
  }
};

module.exports = protect;
