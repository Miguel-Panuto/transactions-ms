const { v4: uuid } = require('uuid');

const fileName = 'UserRepository';

module.exports = ({ db, logger }) => ({
  createUser: (user) => {
    const callName = `${fileName}.createUser()`;
    logger.info(`${callName} entered with user: ${JSON.stringify(user)}`);
    return db.insert(user).into('users');
  },

  updateByUserId: (id, user) => {
    const callName = `${fileName}.updateUser()`;
    logger.info(
      `${callName} entered with id ${id} and body: ${JSON.stringify(user)}`
    );
    return db.update(user).where('id', id).into('users');
  },

  updateUserKeyById: (id, key) => {
    const callName = `${fileName}.updateUser()`;
    logger.info(`${callName} entered with id ${id} and key ${key}`);
    return db.update({ key }).where('id', id).into('users');
  },

  findUserById: (id) => {
    const callName = `${fileName}.findUserById()`;
    logger.info(`${callName} entered with id ${id}`);
    return db.select('*').from('users').where('id', id).first();
  },

  findUserIdByKey: async (key) => {
    const callName = `${fileName}.findUserByKey()`;
    logger.info(`${callName} entered with id ${key}`);
    const users = await db.select('id').from('users').where('key', key);
    if (users.length !== 1) throw new Error('not single user');
    return users[0];
  },

  delete: async (id) => {
    const callName = `${fileName}.delete()`;
    logger.info(`${callName} entered with id ${id}`);
    const delUser = await db
      .update({
        name: 'Usuário deletado',
        document: uuid(),
        email: uuid(),
        phone: uuid(),
        key: null,
      })
      .from('users')
      .where('id', id);
    return delUser;
  },
});
