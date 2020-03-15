'use strict';
const { getCurentVersion,execCmdList,localCodeIsModify } = require('./helpers');
const chalk = require('chalk');

function finshEnvBranch(env, brname,tagVersion) {
	tagVersion = tagVersion || brname;
	brname = `${env}/${brname}`;
	switch (env) {
		case 'feature':
			runFinshFeature(brname);
			break;
		case 'release':
			runFinshRelease(brname,tagVersion);
			break;
		case 'hotfix':
			runFinshHotfix(brname,tagVersion);
			break;
		default:
	}
}

module.exports = function (tagVersion) {
	localCodeIsModify();
	let opts = this.opts();
	let keys = Object.keys(opts);
	for (let i = 0, len = keys.length; i < len; i++) {
		let env = keys[i];
		if (opts[env]) {
			finshEnvBranch(env, opts[env],tagVersion);
			break;
		}
	}
}

//todo: merge reject?
function runFinshFeature(brname) {
	let cmdList = [
		`git checkout develop && git pull`,
		`git merge --no-ff ${brname}`,
		`git push origin develop`,
		`git branch -d ${brname}`
	];

	let errorType = execCmdList(cmdList);
	pritLogs([
		`- merge the ${brname} into develop;`,
		`- delete branch ${brname}`
	],errorType);
}

function runFinshRelease(brname,tagVersion) {
	if(getCurentVersion() !== tagVersion){
		console.log(chalk.red('The tag version number set is not consistent with the version in package.json, please check.'));
		console.log('more detail: gitfw finsh -h');
		process.exit(1);
	}

	let tagName = `v${tagVersion}`;
	let cmdList = [
		`git checkout develop && git pull`,
		`git merge --no-ff ${brname} && git push`,
		`git checkout master && git pull`,
		`git merge --no-ff ${brname} && git push`,
		`git tag -a ${tagName} -m 'my version ${tagName}'`,
		`git push origin ${tagName}`,
		`git branch -d ${brname}`
	];

	let errorType = execCmdList(cmdList);
	pritLogs([
		`- merge the ${brname} into develop;`,
		`- merge the ${brname} into master;`,
		`- git push origin tag ${tagName};`,
		`- delete branch ${brname}`
	], errorType);
}

function runFinshHotfix(brname,tagVersion) {
	runFinshRelease(brname,tagVersion);
	// let cmdList = [
	// 	`git checkout develop && git pull`,
	// 	`git merge --no-ff ${brname} && git push`,
	// 	`git checkout master && git pull`,
	// 	`git merge --no-ff ${brname} && git push`,
	// 	`git branch -d ${brname}`
	// ];
	// let tagName = `v${tagVersion}`;

	// let errorType = execCmdList(cmdList);
	// pritLogs([
	// 	`- merge the ${brname} into develop;`,
	// 	`- merge the ${brname} into master;`,
	// 	`- delete branch ${brname}`
	// ], errorType);
}



function pritLogs(msgs,errorType) {
	if(errorType.mergeConflict){
		msgs.push(chalk.red(`- reject ${errorType.mergeConflict}`));
	}
	console.log('\n');
	console.log('Operation information:');
	msgs.forEach((msg) => {
		console.log(chalk.green(msg));
	});
};