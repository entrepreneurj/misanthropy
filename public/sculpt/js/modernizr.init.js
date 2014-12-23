Modernizr.addTest('highresdisplay', function(){ 
        if (window.matchMedia) { 
                var mq = window.matchMedia("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
                if(mq && mq.matches) {
                        return true;
                } 
    }
});


if (Modernizr.touch) { 
//load touch enabled scripts	

	Modernizr.load
		(
			[
			'library/js/jquery.scrollTo.min.js',
			'library/js/jquery.localscroll.min.js',
			'library/js/jquery.autosize.min.js',
			'library/js/jquery.form.min.js',
			'library/js/jquery.validate.min.js',
			'library/js/init.touch.js'
			]
		)
	
} else { 
	
	if (Modernizr.mq && Modernizr.csstransforms3d) {
	//load modern browser scripts	
		Modernizr.load
		(
			[
			'library/js/lightbox-2.6.min.js',
			'library/js/jquery.autosize.min.js',
			'library/js/jquery.form.min.js',
			'library/js/jquery.validate.min.js',
			'library/js/jquery.scrollTo.min.js',
			'library/js/jquery.localscroll.min.js',
			'library/js/init.standard.js?'
			]
		)
		}
	
	else { 
	//load legacy browser scripts
		Modernizr.load
		(
			[	
			'library/js/lightbox-2.6.min.js',
			'library/js/jquery.autosize.min.js',
			'library/js/jquery.form.min.js',
			'library/js/jquery.validate.min.js',
			'library/js/jquery.scrollTo.min.js',
			'library/js/jquery.localscroll.min.js',
			'library/js/respond.min.js?',
			'library/js/selectivizr.min.js',
			'library/js/init.legacy.js'
			]		
		)
	}
	
}





