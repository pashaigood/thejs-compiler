//PBelugin: плохой способ, подходит только для часныого случия
exports.exec = function(file) {
    file = file.replace(/the\.js[\s]*?\([\s\S]*?function/ig, "the\.js(function");
    file = file.replace(/include[\s]*?\([\s\S]*?function/ig, "include(function");
    return file;
}
