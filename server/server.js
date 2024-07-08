const express = require('express');
const quizapp = express();
const cors = require('cors');
//const firebaseConfig = require('./firebaseConfig');
const fetchData = require('./logic');
//const MockDatabase = require('./MockDatabase');
//const checkanswer = require('./checkanswer');
//const questions = database.getQuestions();
//const fetchData = new fetchData(questions);
const PORT = 5000;

// Import Firebase modules
//const firebase = require('firebase/app');
//require('firebase/database');
//firebase.initializeApp(firebaseConfig);
//const database = firebase.database();

quizapp.use(cors({
  origin:'http://localhost:3000'
}));
 
class MockDatabase{
    constructor() {
        this.question = [{
            question: 'What is the capital of France?',
            options: ['frankfurt', 'berlin','tokyo', 'paris'],
            answer: 'paris'},

            {question:'what is the capital of Germany?',
            options: ['frankfurt', 'berlin','tokyo', 'paris'],
            answer: 'berlin'}];
            }
     getQuestions(){
      return this.question;} }

const database = new MockDatabase(); // Create an instance of the mock database

    
quizapp.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

quizapp.get('/get=questions', async (req,res) => {
  try {
    const questions = database.getQuestions();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({error: 'failed to fetch questions!'});
  }
}
);

quizapp.get('/get-options', async (req, res) => {
  try {
    const questions = database.Questions();
    const options = question.map(question => ({
      question : question.question,
      options: question.options
    }));
    res.json(options);
  }catch(error){
    console.error('Error fetching option:', error);
    res.status(500).json({error: 'failder to fetch options!'});
  }
});

quizapp.get('/get-amswer', async(req,res) => {
  try {
    const question = database.getQuestions();
    const answer = question.map(question => ({
      question : question.question,
      answer: question.answer
    }));
    res.json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({error: 'failed to fetch answers!'})
  }});


// quizapp.get('/get-questions', async (req, res) => {
//   try {
//     const questions = await fetchData.fetchQuestions(req, res); 
//     res.json(questions);
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     res.status(PORT).json({ error: 'Failed to fetch questions!' });
//   }
// });

// quizapp.get('/get-options', async (req,res) => {
//   try{
//     const options = await fetchData.fetchOptions(req,res);
//     res.json(options);
//   } catch(error){
//     console.error('Error fetching options:', error);
//     res.status(PORT).json({error: 'Failder to fetch question!'});
//   }
// });

// quizapp.get('/get-answers', async (req,res) => {
//   try{
//     const options = await fetchData.fetchanswer(req,res);
//     res.json(options);
//   } catch(error){
//     console.error('Error fetching answer:', error);
//     res.status(PORT).json({error: 'No answer found!'});
//   }
// });
