class fetchdata{
    constructor(){};

    async fetchQuestions(req, res) {
        const questionsRef = database.ref('questions');
        try {
          const snapshot = await questionsRef.once('value');
          const questionsData = snapshot.val();
          if (!questionsData) {
            throw new Error('No questions found in the database');
          }
          const questions = Object.values(questionsData); 
          return questions; // Return the questions
        } catch (error) {
          console.error('Error fetching questions:', error);
          throw error; 
        }
      }
    
      async fetchOptions(req, res) {
        const optionsRef = database.ref('options'); // Assuming you have an 'options' node in your database
        try {
          const snapshot = await optionsRef.once('value');
          const optionsData = snapshot.val();
          const options = Object.values(optionsData);
          return options; // Return the options
        } catch (error) {
          console.error('Error fetching options:', error);
          throw error; 
        }
      }
      async fetchAnswer(req,res) {
        const answerRef = database.ref('answer');
        try{
          const snapshot = await answerRef.once('value');
          const answerData = snapshot.val();
          const answer = Object.values(answerData);
          return answer;
        } catch (error) {
          console.error('Error fetching answer:', error);
          throw error;
        }
      }
    }
    