exports.exec = function(file) {
    file = file.replace(/require[\s:]+\[[\s\S]*?\],*/g, '');
    return file;
}
