const fileName = 'DeleteUserUsecase';
const makeUser = require('src/app/user/entities/UserEntity');

module.exports = ({ logger, userRepository }) => ({
  delete: async (id) => {
    const callName = `${fileName}.delete()`;
    logger.info(`${callName} entered with id: ${id}`);
    const delUser = await userRepository.delete(id);
    logger.info(
      `${callName} user has been deleted: ${JSON.stringify(delUser)}`
    );
  },
});
