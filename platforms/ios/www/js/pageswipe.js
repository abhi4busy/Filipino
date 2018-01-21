$( document ).on( "pageinit", "[data-role='page'].demo-page", function() {
    var page = "#" + $( this ).attr( "id" ),
        // Get the filename of the next page that we stored in the data-next attribute
        next = $( this ).jqmData( "next" ),
		
        // Get the filename of the previous page that we stored in the data-prev attribute
        prev = $( this ).jqmData( "prev" );
    // Check if we did set the data-next attribute
    if ( next ) {
	
        // Prefetch the next page
        $.mobile.loadPage( next + ".html" );
		//alert("hi");
        // Navigate to next page on swipe left
        $( document ).on( "swipeleft", page, function(event) {
		//alert('swipe'+next);
		
		//for pause video of page
		
		var currentVideo=$(this).find('div.itemimg').html();
		$(this).find('div.itemimg').empty();
		$(this).find('div.itemimg').html(currentVideo);
           // For Details Page Slide
			if($(this).attr('id')){
			
			if(next == 'article25') {
				event.preventDefault();
				return false;
			}
			var nextpage = $.mobile.activePage.next('[data-role="page"]');
			// swipe using id of next page if exists
			if (nextpage.length > 0) {
			if(event.handled !== true) // This will prevent event triggering more then once
			{
				$.mobile.changePage(nextpage, {transition: "slide", reverse: false,changeHash: false,reloadPage: true }, true, true);
				 event.handled = true;
				 event.stopImmediatePropagation();
			}
			}
			
			}else{
				$.mobile.changePage( next + ".html", { transition: "slide" });
			}
			
        });
        // Navigate to next page when the "next" button is clicked
        $( ".control .next", page ).on( "click", function() {
            $.mobile.changePage( next + ".html", { transition: "slide" } );
        });
    }
    // Disable the "next" button if there is no next page
    else {
        $( ".control .next", page ).addClass( "ui-disabled" );
    }
    // The same for the previous page (we set data-dom-cache="true" so there is no need to prefetch)
    if ( prev ) {
        $( document ).on( "swiperight", page, function(event) {
		//for pause video of page
		
		var currentVideo=$(this).find('div.itemimg').html();
		$(this).find('div.itemimg').empty();
		$(this).find('div.itemimg').html(currentVideo);
		
            if($(this).attr('id')){
			//For Deatils Page Slide
			if(prev == 'article-1') {
				event.preventDefault();
				return false;
			}
			var prevpage = $(this).prev('[data-role="page"]');
			if (prevpage.length > 0) {
			if(event.handled !== true) // This will prevent event triggering more then once
			{
				$.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
				event.handled = true;	
			}
			}
		}else{
		  $.mobile.changePage( prev + ".html", { transition: "slide", reverse: true } );
		}
			
        });
        $( ".control .prev", page ).on( "click", function() {
            $.mobile.changePage( prev + ".html", { transition: "slide", reverse: true } );
        });
    }
    else {
        $( ".control .prev", page ).addClass( "ui-disabled" );
    }
});