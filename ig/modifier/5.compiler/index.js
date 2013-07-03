var fs = require('fs'),
    child_process = require('child_process'),
    path = require('path'),
    PS = path.delimiter || path.sep,
    PATH = __dirname + PS;
    
exports.exec = function(file, next) {
    var compiler_path = PATH + 'compiler.jar',
        tmp_path = PATH + 'input.js',
        tmp_out_path = PATH + 'output.js',
        cmd = "java"
              + " -jar " + compiler_path
              + " --js " +  tmp_path
              + " --js_output_file " + tmp_out_path;
        
    fs.writeFileSync(tmp_path, file);
    var ch = child_process.exec(cmd);
        
    ch.on('exit', function() {
        setTimeout(function() {
            try{
                file = fs.readFileSync(tmp_out_path, 'utf-8');
                fs.unlinkSync(tmp_path);
                fs.unlinkSync(tmp_out_path);
            } catch(e) {}
            
            next(file);
        }, 300);
    });
}
