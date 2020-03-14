'use strict';

const { exec } = require('./helpers');
const chalk = require('chalk');
function logs(msg){
	console.log(msg);
}

function pritLogs(brname,base){
	logs(' ');
	logs('Operation information:');
	logs(`- Check out a branch '${chalk.green(brname)}' on '${chalk.green(base)}' branch`);
	logs(`- You are now on branch '${chalk.green(brname)}'`);
};

function startEnvBranch(env,brname){
	brname = `${env}/${brname}`;
	switch (env) {
		case 'feature':
			exec(`git checkout -b ${brname} develop`);
			pritLogs(brname,'develop');
			break;
		case 'hotfix':
			exec(`git checkout -b ${brname} master`);
			pritLogs(brname,'master');
			break;
		case 'release':
			exec(`git checkout -b ${brname} develop`);
			pritLogs(brname,'develop');
			break;
		default:
	}
}

module.exports = function(){
	let opts = this.opts();
	let keys = Object.keys(opts);
	for(let i = 0,len = keys.length; i < len; i++){
		let env = keys[i];
		if(opts[env]){
			startEnvBranch(env,opts[env]);
			break;
		 }
	}
}
