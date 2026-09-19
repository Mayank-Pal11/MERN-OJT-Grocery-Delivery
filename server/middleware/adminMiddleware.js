const admin = (req, res, next) => {
  // Check if the user exists and if their role is exactly "admin"
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    // If they are not an admin, deny access
    res.status(403).json({
      message: 'Access denied. Admin privileges required.'
    });
  }
};

module.exports = admin;
