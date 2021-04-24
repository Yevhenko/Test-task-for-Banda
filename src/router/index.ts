import express from 'express';

import signin from './signin';
import logout from './logout';
import user from './user';
import { auth } from './auth';

const router = express.Router();

router.use(signin);
router.use(logout);
router.use(auth);
router.use(user);

export = router;
