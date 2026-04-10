const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {

    const userRole = req.headers['user-role']; 

    if (userRole === 'ADMIN') {
        return res.status(200).send("Hi from ADMIN");
    } 
    
    if (userRole === 'USER') {
        return res.status(200).send("Hi from USER");
    }

    
    res.status(401).send("You are not allowed to do this");
});


module.exports = router;
