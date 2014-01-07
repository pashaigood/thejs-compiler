var packer = require('packer');
exports.exec = function(file) {
	var length = file.length;
	file = packer.pack(file, true);

	console.log('	compressed value: ' + (length - file.length))
	
	return file;
}