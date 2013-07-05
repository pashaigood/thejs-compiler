exports.exec = function (file, path) {
    
    if (path != 'index') {
        if(
            (match = file.match(/the\.js[^=]*?function[\(\)\s]*{([\s\S]*)}/))
        ) {
            file = match[1] + ';';
        }
    }
    
    return file;
}
