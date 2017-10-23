
module.exports = function(req){
	var languageType = req.session.languageType;
    switch (languageType)
    {
	    case "1":
	    var la = require('./language/en-US.language.js');
	    break;

	    case "2":
	    var la = require('./language/zh-CN.language.js');
	    break;

	    default:
        var la = require('./language/zh-CN.language.js');
    }

    return la;
}

