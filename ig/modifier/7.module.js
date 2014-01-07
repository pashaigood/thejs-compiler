exports.exec = function(file) {
    file = "(function(){" + file + "})()";
    return file;
}
