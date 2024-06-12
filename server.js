import express from 'express';
import db from './db.js';
import passport from 'passport';
import Authentication from "./auth.js"
import path from 'path';
import fs from 'fs';
import CryptoJS from 'crypto-js';
import Bcrypt from 'bcrypt';
import fetch from 'node-fetch';

const dirname = fs.realpathSync('.');

class BackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));

    app.use(express.urlencoded({ extended: false }));
    const authentication = new Authentication(app);

    app.get('/login/', this.login);
    app.post('/login/', passport.authenticate('local', { failureRedirect: '/login' }));
    app.get('/', authentication.checkAuthenticated, this.goHome);
    app.post('/register/', this.doRegister);
    app.post('/save', authentication.checkAuthenticated, this.doSave);
    app.get('/get-comments', authentication.checkAuthenticated, this.getComments); 
    app.get('/load-movies', authentication.checkAuthenticated, this.loadMovies); 

    app.listen(3000, () => console.log('Listening on port 3000'));
  }

  async doRegister(req, res) {
    const key = "Programacion III - AWI";
    const registerUsername = CryptoJS.AES.decrypt(req.body.username, key).toString(CryptoJS.enc.Utf8);
    const registerPassword = CryptoJS.AES.decrypt(req.body.password, key).toString(CryptoJS.enc.Utf8);

    const saltRounds = 10;
    const salt = await Bcrypt.genSalt(saltRounds);
    const hashedRegisterPassword = await Bcrypt.hash(registerPassword, salt);

    const query = { user: registerUsername };
    const update = { $set: { password: hashedRegisterPassword } };
    const params = { upsert: true };
    const collection = db.collection("users");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }

  async login(req, res) {
    res.sendFile(path.join(dirname, "public/login.html"));
  }

  async goHome(req, res) {
    res.sendFile(path.join(dirname, "public/home.html"));
  }

  async doSave(req, res) {
    try {
      const comment = req.body;
      const collection = db.collection("comentarios");
      await collection.insertOne(comment);
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving comment:', error);
      res.status(500).json({ error: 'Error saving comment' });
    }
  }

  async getComments(req, res) {
    try {
      const collection = db.collection("comentarios");
      const comments = await collection.find({}).toArray();
      res.json({ success: true, comments });
    } catch (error) {
      console.error('Error retrieving comments:', error);
      res.status(500).json({ error: 'Error retrieving comments' });
    }
  }

  async loadMovies(req,res){
  const API_URL = 'https://www.mockachino.com/5eca88b6-0077-4e/movies'; 
  try {

      const response = await fetch(API_URL);
      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
  }   
}

}

new BackendServer();