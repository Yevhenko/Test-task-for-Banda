/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from 'jsonwebtoken';

import { accessSecret } from '../models/index';

export const auth = (req, res, next): any => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) res.sendStatus(401);

  jwt.verify(token, accessSecret, (err, data) => {
    if (err) return res.sendStatus(403);
    req.context = data;
    return next();
  });
};
