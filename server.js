//entry point for the server, set up express app, import routes, middleware, start the server
//project/server.js
const express = require ('express');
const path = require('path');
const cors = require('cors');

const quizapp = express();
const PORT = process.env.PORT || 5000;


quizapp.use(cors());

quizapp.use(express.static(path.join(__dirname, './client')));
// quizapp.use(express.static('client'));
quizapp.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  console.log(`Requested URL: http://localhost:${PORT}`);
});
quizapp.use((req,res, next) =>{
  const requestedUrl = `http://${req.headers.host}`;
  console.log(`Requested URL: ${requestedUrl}`);
  res.locals.requestedUrl = requestedUrl;
  next();
}
)

const Mockdatabase = [
  {
    "question": "What is the capital of France?",
    "options": ["frankfurt", "berlin", "tokyo", "paris"],
    "answer": "paris"
  },

  {
    question: "what is the capital of Germany?",
    options: ["frankfurt", "berlin", "tokyo", "paris"],
    answer: "berlin"
  },

  {
    "question": "What is the capital of Japan?",
    "options": ["frankfurt", "berlin", "tokyo", "paris"],
    "answer": "tokyo"
  },

  {
    "question": "What is the best activity?",
    "options": ["recycling", "berlin", "tokyo", "paris"],
    "answer": "recycling"
  }
];

quizapp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

quizapp.get('/fetch-questions', async (req, res) => {
  try {
    // const question = Mockdatabase.question;
    res.json(Mockdatabase);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'failed to fetch questions!' });
  }
}
);



