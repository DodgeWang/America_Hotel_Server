module.exports = req => {
	let languageType = req.session.languageType;
	let la = null;
    switch (languageType)
    {
	    case 1:
	    la = require('./language/en-US.language.js');
	    break;

	    case 2:
	    la = require('./language/zh-CN.language.js');
	    break;

	    default:
        la = require('./language/en-US.language.js');
    }

    return la;
}

