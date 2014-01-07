var fs = require('fs'),
    path = require('path'),
    PS = path.delimiter || path.sep,
    appBuilder = require('.' + PS + 'ig' + PS + 'AppBuilder');
    
(function() {
    var args = global.process.argv.slice(2),
        params = {
            src : global.process.env.PWD,
            index : 'index',
            outpath : global.process.env.PWD,
            type : appBuilder.APP,
            without_modifier : ''
        };

    for (var i=0, l = args.length; i < l; i+=2) {
        switch(args[i]) {
            case "-src":
                params.src = args[i+1];
                params.outpath = args[i+1];
                break;
            case "-index":
                params.index = args[i+1];
                break;
            case "-type":
                if (args[i+1] =='lib') {
                    params.type = appBuilder.LIB
                }
                break;
            case "-outpath":
                params.outpath = args[i+1];
                break;
            case "-without-modifier":
                params.without_modifier = args[i+1];
        }
    }
    
    // console.log(params)
    appBuilder.build(params, function(file) {
        fs.writeFileSync(params.outpath + PS + 'app.js', file);
    });
})();
