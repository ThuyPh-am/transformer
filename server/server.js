//entry point for the server, set up express app, import routes, middleware, start the server
import express from "express";
express = require('express');

const quizapp = express();
const cors = require('cors');
const firebaseConfig = require('./firebaseConfig');
const fetchData = require('./logic');
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
 
