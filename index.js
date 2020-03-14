#!/usr/bin/env node
'use static';

const program = require('commander');
const pkg = require('./package.json');
const branch = require('./script/branch');
const acmp = require('./script/acmp');
const start = require('./script/start');
const finsh = require('./script/finsh');
//check allready install git 
require('./script/helpers/git');

program
  .command('acmp [msg]')
  .description('one line command commit code')
  .option('--feat', 'Add new feature')
  .option('--fix', 'Fix bug, hotfix')
  .option('--style', 'Document related')
  .option('--docs', 'Style modification, word modification, formatting, etc.')
  .option('--refactor', 'Refactor')
  .option('--perf', 'Improve performance')
  .option('--test', 'Test related')
  .option('--chore','Business-unrelated modification')
  .option('--deps','upgrade deps')
  .option('--release','Release version')
  .option('--other','Other modification')
	.action(acmp);

program
	.version(pkg.version)
	.command('branch [brname] [baseBranch]')
  .description('checkout new branch by other branch(default develop branch)')
  .alias('br')
	.action(branch);

program
	.command('start')
  .description('start iterating and branch switching')
  .alias('s')
  .option('-f, --feature <name>', 'Branch prefixed with feature')
  .option('-x, --hotfix <name>', 'Branch prefixed with hotfix')
  .option('-r, --release <name>', 'Branch prefixed with release')
	.action(start);

program
	.command('finsh')
  .description('finsh iterating and branch switching')
  .alias('f')
  .option('-f, --feature <name>', 'Branch prefixed with feature')
  .option('-x, --hotfix <name>', 'Branch prefixed with hotfix')
  .option('-r, --release <name>', 'Branch prefixed with release')
  .action(finsh);
  
program.parse(process.argv);
