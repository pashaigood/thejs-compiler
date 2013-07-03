exports.exec = function(file) {
    
    if (file.search(/@mini/) > -1) {
        var length = exports.places.length,
            name = "thejs.mini" + exports.ts + "=" + length;
            exports.places.push({
                name : name,
                file : file
            });
            
        file = name + "\n";
    }
    
    return file;
}

exports.ts = new Date().getTime();
exports.places = [];
