namespace('test', {
    require : [
    	'jquery.Jquery',
    	'jquery.ui',
    	'jquery.jplayer.Jplayer'
    ],
    Test : {
        Test : function() {
        	if (DEBUG) {
        		console.log('debuging')
        	}

            console.log($);
        }
    }
});
