// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
	presets: [['env', { targets: { node: '10' } }]],
});

// Import the rest of our application.
require('dotenv').load();
module.exports = require('./index.js');
