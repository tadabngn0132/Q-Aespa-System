const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

global.Question = require('./api/models/QuestionModel');
const questionRoutes = require('./api/routes/QuestionRoute');

global.Answer = require('./api/models/AnswerModel');
const answerRoutes = require('./api/routes/AnswerRoute');

global.User = require('./api/models/UserModel');
const userRoutes = require('./api/routes/UserRoute');

global.Tag = require('./api/models/TagModel');
const tagRoutes = require('./api/routes/TagRoute');

global.Vote = require('./api/models/VoteModel');
const voteRoutes = require('./api/routes/VoteRoute');

const username = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = encodeURIComponent(process.env.MONGO_DB);
const cluster = process.env.MONGO_CLUSTER;

const URI = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', true);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const port = parseInt(process.env.NODE_PORT) || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

questionRoutes(app);
answerRoutes(app);
userRoutes(app);
tagRoutes(app);
voteRoutes(app);

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found`})
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

