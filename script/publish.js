'use strict';

const { exec,exit,localCodeIsModify,getCurentBranchName,getCurentVersion } = require('./helpers');
const chalk = require('chalk');

module.exports = function(env,name){
	let tagVersion = 'v' + getCurentVersion();
	if(env === 'hotfix' || env === 'release'){
		let offBranch = env === hotfix ? 'master' : 'develop';
		exec(`git checkout ${offBranch}`)
		exec(`git merge --no-ff ${mergeBranchName} && git push`)
		exec(`git checkout master`)
		exec(`git merge --no-ff ${mergeBranchName} && git push`)
		exec(`git tag -a ${tagVersion}`)
		exec(`git push origin ${tagVersion}`)
		exec(`git branch -d ${getCurentVersion()}`)
	}
}
