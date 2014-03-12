global.PS = '/';
global.PATH = __dirname;

var argv = require('optimist').argv,
	fs = require('fs'),
    path = require('path'),
    PS = path.delimiter || path.sep,
    appBuilder = require('.' + PS + 'ig' + PS + 'AppBuilder');
    
(function() {
    var params = {
            src : path.normalize(process.cwd() + "/src/"),
            index : 'index',
            outpath : path.normalize(process.cwd() + "/"),
            type : "simple",
            without_modifier : ''
        };
        
    for (var key in argv) {
    	params[key] = argv[key];
    }
    
    var type_path = PATH + PS + "types" + PS + params['type'] + ".json";
    if (fs.existsSync(type_path)) {
    	try {
		    var type_params = JSON.parse(fs.readFileSync(type_path));
		    for (var key in type_params) {
		    	params[key] = type_params[key];
		    }
    	}
    	catch (e) {}
    }
    
    console.log(params);
    
    appBuilder.build(params, function(file) {
        fs.writeFileSync(params.outpath + PS + 'app.js', file);
    });
})();
