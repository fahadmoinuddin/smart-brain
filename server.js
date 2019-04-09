const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'fahad',
		database: 'smart-brain'
	}
});
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*
API routes

/ --> GET - res = this is working
/signin --> POST - res = success/fail
/register --> POST - res = return new user
/profile/:userId --> GET - res = return user
/image --> PUT - res = return updated user

*/

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.getProfile(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall);

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});