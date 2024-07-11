//entry point for the server, set up express app, import routes, middleware, start the server
const express = require ('express');
const path = require('path');
const cors = require('cors');

const quizapp = express();
const PORT = process.env.PORT || 5000;


quizapp.use(cors());

// quizapp.use(express.static(path.join(__dirname, './client')));
quizapp.listen(PORT, () => {console.log("Example app listening on port ${PORT}");});


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
  }];


quizapp.get('/', (req, res) => {
  res.sendFile(__dirname + './client/index.html');
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

// quizapp.get('/get-options', async (req, res) => {
//   try {
//     // const question = Mockdatabase.question();
//     const options = Mockdatabase.map(q => ({
//       question: q.question,
//       options: q.options
//     }));
//     res.json(options);
//   } catch (error) {
//     console.error('Error fetching option:', error);
//     res.status(500).json({ error: 'failder to fetch options!' });
//   }
// // });

// quizapp.get('/get-amswer', async (req, res) => {
//   try {
//     // const question = question.question();
//     const answer = Mockdatabase.map(q => ({
//       question: q.question,
//       answer: q.answer
//     }));
//     res.json(answer);
//   } catch (error) {
//     console.error('Error fetching answers:', error);
//     res.status(500).json({ error: 'failed to fetch answers!' })
//   }
// });

