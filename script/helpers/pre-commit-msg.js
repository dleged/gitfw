const { filterObjectValueTrue } = require('./index.js');


exports.preCommitMsg = function(options,msg){
    let preList = filterObjectValueTrue(options);
    if(!preList.length){
        preList.push('feat');//modify prefix feat
    }
    return preList;
}