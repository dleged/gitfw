'use strict';

const { exec,exit,localCodeIsModify,getCurentBranchName } = require('./helpers');
const chalk = require('chalk');
const version = require('../package').version;

function localHaveUpdate(){
	if(exec('git pull --porcelain').stdout.trim()){
		console.log(chalk.red('There are file changes in the current branch, please commit or checkout first'));
		exit(1);
	};
}

function isDevelop() {
	if(getCurentBranchName() !== 'develop') {
		if(exec('git merge develop && git co develop').code === 0){
			return true;
		}else{
			console.error('please merge the current branch into the master branch first！');
			return false;
		}
	}
	return true;
}

module.exports = function(brname,baseBranch = 'develop') {
	localCodeIsModify();
	exec(`git checkout ${baseBranch}`);
	exec(`git pull`);
	if(!exec(`git checkout -b ${brname} ${baseBranch}`).stderr) {
		exec(`git checkout ${brname}`);
		console.log(`✅new branch ${brname} completed`);
	};
}
