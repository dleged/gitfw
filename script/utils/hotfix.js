'use strict';
const { exec,exit,localCodeIsModify,getCurentBranchName } = require('./helpers');
const chalk = require('chalk');
let hotfixPre = 'hotfix/';

function getArgs(){
	return [].slice.apply(process.argv);
}

module.exports = function() {
	let hotfixName = getArgs()[2];
	// hotfix 以hotfix/开头；
	// 检验传入参数是否fhotfix/开头，若是以它开头则直接使用；
	if(getArgs){
	  let preName = hotfixName.slice(0,8);//
		if(hotfixName !== hotfixPre){
			hotfixName = hotfixPre + hotfixName;
		}
		console.log(hotfixName,'232');
		exec(`git checkout develop && git checkout -b ${hotfixName}`);
	}else{
		console.log(chalk.red('❌ 请输入hotfix分支名称！'));
		exit(1);
	}
}
