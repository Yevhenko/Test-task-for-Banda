import express from 'express';
import * as jwt from 'jsonwebtoken';

import { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } from '../models/index';

import { getUser, createToken } from '../handler';

const signin = express.Router();

signin.post('/signin', async (req, res) => {
  try {
    const { body } = req;
    const { id, password } = body;

    const user = await getUser(body);

    if (!id || !password) {
      res.status(404).send('Not found');
    }

    if (user.id !== id || user.password !== password) {
      throw new Error('username or password is incorrect!');
    }

    console.log(id);

    const accessToken = jwt.sign({ id }, accessSecret, { expiresIn: accessTokenLife });
    const refreshToken = jwt.sign({ id }, refreshSecret, { expiresIn: refreshTokenLife });

    await createToken(body, refreshToken);

    const response = {
      message: 'Logged in',
      accessToken,
      refreshToken,
    };

    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

signin.post('/refresh', async (req, res, next) => {
  try {
    const { body } = req;
    const { id, password, refreshToken: token } = body;

    const user = await getUser(body);

    if (!id || !password) {
      res.status(404).send('Not found');
    }

    if (user.id !== id || user.password !== password) {
      throw new Error('username or password is incorrect!');
    }

    if (token !== user.refreshToken) {
      throw new Error('refreshToken is invalid!');
    }

    const accessToken = jwt.sign({ username: id }, accessSecret, { expiresIn: accessTokenLife });
    const newRefreshToken = jwt.sign({ username: id }, refreshSecret, { expiresIn: refreshTokenLife });

    const response = {
      message: 'refreshed',
      accessToken,
      newRefreshToken,
    };

    await createToken(body, newRefreshToken);

    res.json({ response });
  } catch (err) {
    next(err);
  }
});

export = signin;
