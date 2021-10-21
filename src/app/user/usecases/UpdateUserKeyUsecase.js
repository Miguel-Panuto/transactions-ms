const fileName = 'UpdateUserKeyUsecase';

module.exports = ({ logger, userRepository }) => ({
  update: async (id, key) => {
    const callName = `${fileName}.update()`;
    logger.info(`${callName} entered with ${id} and key ${key}`);
    const user = await userRepository.findUserById(id);
    logger.info(`${callName} finded user ${JSON.stringify(user)}`);
    const finded = ['phone', 'document', 'email'].find(
      (type) => user[type] === key
    );
    if (!finded)
      throw new Error('user key must to be: document, phone or email!');
    await userRepository.updateUserKeyById(id, key);
    return userRepository.findUserById(id);
  },
});
