const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res) => {
    const authHeader = req.headers.authorization || '';
    const token = (authHeader.startsWith('Bearer ') && authHeader.split(' ')[1]) || req.query.token;

    if (!token) return res.status(401).send("You are not allowed to do this");
    try {
      const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
      const payload = secret ? jwt.verify(token, secret) : jwt.decode(token);
      const isAdmin = !!(payload && payload.isAdmin === true);

      if (isAdmin === true) {
        return res.status(200).send("Hi from ADMIN");
      } 
      
      else if (isAdmin === false) {
          return res.status(200).send("Hi from USER");
      }
      
    } catch (err) {
      return res.status(401).send("You are not allowed to do this");
    }
});


module.exports = router;
