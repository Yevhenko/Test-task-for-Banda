import express from 'express';
import { deleteToken } from '../handler';

const logout = express.Router();

logout.get('/logout/:all', async (req, res) => {
  try {
    const { params, query } = req;

    await deleteToken(params, query);

    res.send('token has been removed');
  } catch (error) {
    throw new Error(error);
  }
});

export = logout;
