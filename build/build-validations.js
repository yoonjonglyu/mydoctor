const chalk = require('chalk');
const ERR_NO_ENV = chalk.red(
    `you must pass an --env.env, 웹팩 빌드를 위해서 환경 변수를 포함해주세요!`
);

module.exports = {
    ERR_NO_ENV
};