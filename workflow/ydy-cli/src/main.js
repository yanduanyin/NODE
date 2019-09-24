import program from 'commander'; // 安装 命令行的处理
import install from './install';  // es6 模块化

program.command('install')
  .description('install template')
  .alias('i')
  .action(() => {
    // console.log('install template命令执行了');
    install();
  })
  console.log('program');
  program.parse(process.argv);


