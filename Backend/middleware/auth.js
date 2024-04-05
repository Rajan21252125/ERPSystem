const jwt = require("jsonwebtoken");



// Middleware to validate JWT token
const verifyToken = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const jwtToken = token.replace("Bearer ","").trim();
    // Verify the token
    jwt.verify(jwtToken, 'ErpForFinalYear', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // If token is valid, attach the decoded payload to the request object
      req.user = decoded;
      next();
    });
  };


module.exports = verifyToken;