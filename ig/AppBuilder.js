global.PS = '/';
global.PATH = global.process.env.PWD;

var AppBuilder = exports,
    fs = require('fs'),
    path = require('path'),
    // PS = path.delimiter || path.sep,
    // PATH = global.process.env.PWD,
    part_modifiers = fs.readdirSync(PATH + PS + "ig" + PS + 'pre_modifier');
    
    
    
AppBuilder.LIB = 1;
AppBuilder.APP = 0;
    
AppBuilder.build = function(params, ready) {
    console.log('Start build');

    var file = '';
    
    if (params.type == AppBuilder.LIB) {
        
    } else {
        file = this.get_source_data('the', params.src);
    }
    
    file += this.make_file(params.index, params.src);
    exec_modifier(file, params.without_modifier.split('|'), ready);
    console.log('End build');
}

AppBuilder.make_file = function (class_name, src) {
    var output = "";
    
    if (! AppBuilder.make_file.cache[src+class_name]) {
        var file_data = AppBuilder.get_source_data(class_name, src),
            parts = AppBuilder.get_required(file_data);
            
        for (var i = 0, l = parts.length; i < l; i++) {
            if (parts[i]) {
                output += AppBuilder.make_file(parts[i], src);
            }
        }
        
        
        
        for (var i = 0, l = part_modifiers.length; i < l; i++) {
            file_data = require(PATH + PS + 'ig' + PS + 'pre_modifier' + PS 
                + part_modifiers[i]).exec(
                    file_data, class_name
                );
        }
        
        
        output += file_data;
        AppBuilder.make_file.cache[src+class_name] = true;
    }
    
    return output;
}
AppBuilder.make_file.cache = {};

AppBuilder.get_source_data = function(class_path, src) {
    class_path = path.normalize(src + PS + class_path.replace(/\./g, PS)) + '.js';
    var file_data;
    
    if (fs.existsSync(class_path)) {
        console.log(class_path);
        file_data = fs.readFileSync(class_path, 'utf-8') + "\n";
    }
    
    // if (file_data) {
        // for (var i = 0, l = part_modifiers.length; i < l; i++) {
            // file_data = require(PATH + PS + 'ig' + PS + 'pre_modifier' + PS 
                // + part_modifiers[i]).exec(
                    // file_data, class_path.replace(src + PS, '')
                // );
        // }
    // }
    
    return file_data || '';
}

AppBuilder.get_required = function(input, type) {
    input = input.replace(/\s/g, '');
    
    var rg = /the\.js(.*?)function/ig,
        rg2 = /require.*?\[(.*?)\]/g,
        matchs = input.match(rg);
        
    var result,
        returned = [];
        
    while ((result = rg2.exec(input)) != null) {
        returned = returned.concat(result[1].replace(/"|'/g, '').split(','));
    }
    
    while ((result = rg.exec(input)) != null) {
        result = result[1].replace(/\(|'|"/g, '').split(',');
        returned = returned.concat(result);
    }
    
    return returned;
}


function exec_modifier(file, without_modifier, ready) {
    var path = PATH + PS + 'ig' + PS + 'modifier' + PS;
        files = fs.readdirSync(path).sort();
        
    function next(new_file) {
        if (new_file) {
            file = new_file;
        }
        
        var file_name = files.shift();

        if (! file_name) {
            ready(file);
            return true
        };
        
        var name = file_name.replace(/\d\.([^\.]+).*/, '$1');
        if (without_modifier.indexOf(name) > -1) {
            next();
            return;
        }
        // if (
        //     without_modifier
        //         &&
        //     without_modifier.search(file_name.replace(/^\d\./, '')) > -1
        // ) {
        //     next();
        //     return;
        // }
        
        console.log('start modifier: ' + name);
        file = require(path + file_name).exec(file, next);
        
        if (file) {
            next();
        }
    }
    next();
    return file;
}
