const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// NOTE: Primitive in-memory user store for demo/testing only.
// Replace with a proper database and hashed passwords in production.
const users = [
	{ id: 1, username: 'ADMIN', password: 'ADMIN', isAdmin: true },
	{ id: 2, username: 'USER', password: 'USER', isAdmin: false  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

router.post('/', (req, res) => {
	const { username, password } = req.body || {};
	if (!username || !password) return res.status(400).json({ error: 'Invalid credentials' });

	const user = users.find(u => u.username === username && u.password === password);
	if (!user) return res.status(400).json({ error: 'Invalid credentials' });

	const payload = { sub: user.id, username: user.username };
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

	res.json({ token });
});

module.exports = router;