//Express routes that handle requests from the frontend (e.g., /get-questions, /submit-answer).
const express = require('express');
const router = express.Router();

const database = require('..routes/server');


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
  });
  
router.get('/get-questions', async (req,res) => {
    try {
      const questions = database.getQuestions();
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({error: 'failed to fetch questions!'});
    }
  }
  );
  
  router.get('/get-options', async (req, res) => {
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
  
  router.get('/get-amswer', async(req,res) => {
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

  module.exports = router;
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
  