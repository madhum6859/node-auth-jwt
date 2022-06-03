const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


app.set('view engine', 'ejs');


const dbURI = 'mongodb+srv://userOne:userOne1234@cluster0.ze5za.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

console.log("open localhost:3000 in browser")


app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));

app.use(authRoutes);