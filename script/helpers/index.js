'use strict';

const shell = require('shelljs');
const chalk = require('chalk');
const path = require('path');
let _exec_ = shell.exec;

//_exec_ run stderr
let stdoutErrorType = {
	mergeConflict: null,
}

function _exit_(code){
	process.exit(code);
}

exports.exec = function(){
	return _exec_(...[].slice.call(arguments))
}

exports.exit = _exit_;

exports.setUpStream = function setUpStream(branch){
	// let msg = _exec_('git branch -r');//fetch remote branch
	// if(msg.includes(`origin/${branch}/n`)){
	// 	return _exec_('git push;')//todo faster	
	// }

	return _exec_(`git push --set-upstream origin ${branch} && git push`);
}

exports.localCodeIsModify = function(){
		if(_exec_('git status --porcelain').stdout.trim()){
			console.log(chalk.red('please commit your changes or stash them before you switch branches.'));
			_exit_(1);
		};
}

exports.getCurentBranchName = function(){
	return _exec_('git rev-parse --abbrev-ref HEAD', {silent: true}).toString();
}
/**
 * 
 */
exports.getCurentVersion = function(){
	const pkgPath = path.resolve(process.cwd,'package.json');
	if(fs.existSync()) throw Error('does the package exist?');
	const pkg = require(pkgPath);
	if(!pkg.version) throw Error('versoin is not defined in pacakge.json');
	return pkg.version;
}

/**
 * 
 */
exports.filterObjectValueTrue = function(obj){
	return 	Object.keys(obj).reduce((acc,key) => {
		if(obj[key]){
			acc.push(key);
		}
		return acc;
	},[]);
}



function cmdErrorTypeHandle(stdout,cmdErrorType){
	if(stdout.includes('Merge conflict')){
		cmdErrorType['mergeConflict'] = stdout;
		console.log('\n');
		console.log('Error information:');
		console.log(chalk.red('- ' + stdout));
		console.log(chalk.blue('- ' + 'plase fix conflicts and then commit the result,and try again'));
		_exit_(1);
	}
	return cmdErrorType;
}
exports.execCmdList = function(list){
	let errorType = Object.assign(stdoutErrorType,{});
	list.forEach(cmd => {
		let stdout = _exec_(cmd);
		errorType = cmdErrorTypeHandle(stdout,errorType)
	});
	return errorType;
}

