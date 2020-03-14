'use strict';

const { exec,exit,localCodeIsModify,getCurentBranchName } = require('./helpers');
const chalk = require('chalk');
let releasePre = 'release/';

function getArgs(){
	return [].slice.apply(process.argv);
}

module.exports = function() {
	let releaseName = getArgs()[2];
	// release 以release/开头；
	// 检验传入参数是否frelease/开头，若是以它开头则直接使用；
	if(getArgs){
	  let preName = releaseName.slice(0,8);//
		if(releaseName !== releasePre){
			releaseName = releasePre + releaseName;
		}
		exec(`git checkout develop && git checkout -b ${releaseName}`);
	}else{
		console.log(chalk.red('❌ 请输入release分支名称！'));
		exit(1);
	}
}
