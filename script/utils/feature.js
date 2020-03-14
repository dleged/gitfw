'use strict';

const { exec,exit,localCodeIsModify,getCurentBranchName } = require('./helpers');
const chalk = require('chalk');
let featurePre = 'feature/';

function getArgs(){
	return [].slice.apply(process.argv);
}

module.exports = function() {
	let featureName = getArgs()[2];
	// feature 以feature/开头；
	// 检验传入参数是否feture/开头，若是以它开头则直接使用；
	if(getArgs){
	  let preName = featureName.slice(0,8);//
		if(featureName !== featurePre){
			featureName = featurePre + featureName;
		}
		exec(`git checkout develop && git checkout -b ${featureName}`);
	}else{
		console.log(chalk.red('❌ 请输入feature分支名称！'));
		exit(1);
	}
}
