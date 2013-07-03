namespace('test', {
    require : [
        'jquery.Jquery',
        'test.subtest.SubTest'
    ],
    Test2 : {
        sub : {},
        
        Test2 : function() {
            this.sub = new test.subtest.SubTest();
            this.sub.test();
        }
    }
});
