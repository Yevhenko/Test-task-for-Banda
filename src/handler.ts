import { getRepository, getManager } from 'typeorm';
import ping from 'ping';
import User from './db/entity/User';
import { User as Body } from './models/index';

export const createUser = async (body: Body): Promise<Body> => {
  try {
    if (typeof body.id === 'string') body.idType = 'email';
    body.idType = 'phone';

    const user = getRepository(User).create(body);

    const result = await getRepository(User).save(user);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (body: Body): Promise<Body | null> => {
  try {
    const user = await getRepository(User).findOne({
      where: {
        username: body.id,
        password: body.password,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<Body[] | null> => {
  try {
    const users = await getRepository(User).find();

    if (!users) return null;

    return users.map((user) => ({
      id: user.id,
      idType: user.idType,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createToken = async (body: Body, token: string): Promise<string> => {
  try {
    const user = await getRepository(User).findOne({ where: { id: body.id } });

    if (!user) return 'not found';
    getRepository(User).merge(user, { refreshToken: token });
    await getRepository(User).save(user);

    return 'Token has been saved!';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteToken = async (params: any, query: any): Promise<string> => {
  try {
    const entityManager = getManager();
    if (params === true) await entityManager.query(`UPDATE User SET "refreshToken" = NULL`);
    await entityManager.query(`UPDATE User SET "refreshToken" = NULL WHERE "id" = '${query}'`);

    return 'Token has been deleted';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLatency = async (): Promise<ping> => {
  try {
    const hosts = 'google.com';
    const res = await ping.promise.probe(hosts);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
