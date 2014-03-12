var path = require('path'),
    pre_mini = require(PATH + PS + 'ig' + PS + 'pre_modifier' + PS + 'mini');

exports.exec = function(file) {
    var place;
    
    for (var i=0, l = pre_mini.places.length; i < l; i++) {
        place = pre_mini.places[i];
        file = file.replace(place.name, place.file);
    }
    
    return file;
}
