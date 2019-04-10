/**
 * package.json元数据
 */

module.exports = {

  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A ttapp(抖音/头条小程序) project with ziu',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    tab: {
      type: 'confirm',
      message: 'Use Tab?',
    },
    lint: {
      type: 'confirm',
      message: 'Use ESLint to lint your code?',
    },
    lintConfig: {
      when: 'lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [
        // {
        //     name: 'Standard (https://github.com/standard/standard)',
        //     value: 'standard',
        //     short: 'Standard',
        // },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        // {
        //     name: 'none (configure it yourself)',
        //     value: 'none',
        //     short: 'none',
        // },
      ],
    },
    gitCommitMsg: {
      type: 'confirm',
      message: 'Use commitlint to check commit message?(Angular Commit Message)',
    },
    // sass: {
    //     type: 'confirm',
    //     message: 'Use sass?'
    // }
  },
  filters: {
    'src/assets/imgs/tab.png': 'tab',
    'scripts/.eslintrc.js': 'lint',
    'scripts/.eslintignore': 'lint',
    'commitlint.config.js': 'gitCommitMsg',
  }
};