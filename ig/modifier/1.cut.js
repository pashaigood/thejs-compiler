exports.exec = function(file) {
    file = file.replace(/the\.cut[\s\S]*?the\.cut/ig, '');
    return file;
}
