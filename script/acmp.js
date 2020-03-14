'use strict';

const { exec,exit,setUpStream } = require('./helpers');
const chalk = require('chalk');
const { preCommitMsg } = require('./helpers/pre-commit-msg');

function _currentBranch(){
	let msg = exec('git branch --contains');
	return msg.stdout.split('*')[1].split('\n')[0];
}

function _setUpStream(localBrname){
	setUpStream(localBrname);
}

module.exports = function acmp(msg){
	let localBrname = _currentBranch();
	let prefix = preCommitMsg(this.opts());
	prefix = prefix.join('/') + ': ';
	msg = prefix + msg;
	exec(`git add . && git commit -m '${msg}'`,() => {
		_setUpStream(localBrname);//setUpStream push
		pritLogs(localBrname,msg);
	});
}

function pritLogs(localBrname,msg){
	console.log('\n');
	console.log('Operation information:');
	console.log(`- origin rmote: ${chalk.green(localBrname)}`);
	console.log(`- commit info: ${chalk.green(msg)}\n`);
};
