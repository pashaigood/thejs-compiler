var uglifyjs = require('uglify-js');

exports.exec  = function(file, next) {
	var length = file.length,
		tmp = uglifyjs.minify(
		file,
		{
			
			fromString : true,
			compress : {
				global_defs : {
					DEBUG : false
				},
				drop_console : true,
				sequences     : true,  // join consecutive statemets with the “comma operator”
				properties    : true,  // optimize property access: a["foo"] → a.foo
				dead_code     : true,  // discard unreachable code
				drop_debugger : true,  // discard “debugger” statements
				unsafe        : false, // some unsafe optimizations (see below)
				conditionals  : true,  // optimize if-s and conditional expressions
				comparisons   : true,  // optimize comparisons
				evaluate      : true,  // evaluate constant expressions
				booleans      : true,  // optimize boolean expressions
				loops         : true,  // optimize loops
				unused        : true,  // drop unused variables/functions
				hoist_funs    : true,  // hoist function declarations
				hoist_vars    : false, // hoist variable declarations
				if_return     : true,  // optimize if-s followed by return/continue
				join_vars     : true,  // join var declarations
				cascade       : true,  // try to cascade `right` into `left` in sequences
				side_effects  : true,  // drop side-effect-free statements
				warnings      : true  // warn about potentially dangerous optimizations/code
			}
		}
	);

	file = tmp.code;
	console.log('	Origin size: ' + length + ', compressed size: ' + (file.length) + ", saved: " + Math.round((1 - file.length / length) * 100) + "%");
	return file;
}