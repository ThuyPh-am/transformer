class MockDatabase{
    constructor() {
        this.question = [{
            question: "What is the capital of France?",
            options: ['frankfurt', 'berlin','tokyo', 'paris'],
            answer: "paris"},

            {question:"what is the capital of Germany?",
            options: ['frankfurt', 'berlin','tokyo', 'paris'],
            answer: "berlin"}];
            }
     getQuestions(){
      return this.question;} }

const database = new MockDatabase(); // Create an instance of the mock database
module.exports = database