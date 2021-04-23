import express from 'express';
import { createUser, getAllUsers } from '../handler';

const user = express.Router();

user.post('/signup', async (req, res) => {
  try {
    const { body } = req;

    if (!body) res.sendStatus(404).send('no body');

    const response = await createUser(body);

    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

user.get('/info', async (req, res) => {
  try {
    const response = await getAllUsers();

    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

export = user;
