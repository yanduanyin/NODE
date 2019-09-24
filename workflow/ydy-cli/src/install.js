import ora from 'ora';  // loading 效果
import inquirer from 'inquirer';  // 命令行交互
import downLoadGit from 'download-git-repo' // git 的模板

// 异步的处理方法 
let install = async () => {
  let loading = ora('fetching template....');
  let answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '项目名称',
      default: 'ydyDemo'
    }
  ]);
  console.log(answer,'------');
  loading.start();
  let project = answer.projectName;
  downLoadGit('xlie1123/xl-cli', process.cwd() + '/' + project, (err) => {
    if(err) {
      console.log(err)
      return;
    }
    loading.succeed();
  })
}

export default install;