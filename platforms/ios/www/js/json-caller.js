function ajaxCallStart(){
    $.mobile.loading('show', {
    text: 'foo',
    textVisible: true,
    theme: 'a',
    html: "<div class='newloading'><div class='loadingtable'><div class='loadingcell'><div class='loadingbox'><img src='images/logo_loading.png' /> <br /> <br />Loading...</div></div></div></div>"
  });
}
function ajaxCallStop(){
	  $.mobile.loading( "hide" );
}

function isEmpty(value){
	  return (value == null || value.length === 0);
}

function callRestGet(url, callbackFunctionSuccess, callbackFunctionFailure,
		asynch) {
	ajaxCallStart();
	if (isEmpty(asynch)) {
		asynch = true;
	}

	$.ajax({
		type : 'GET',		
		url : url,
		async : asynch,
		complete : function(result, textStatus) {
			if (result.status === 200) {
				if (callbackFunctionSuccess != null) {
					callbackFunctionSuccess(result);
				}
			} else {
			 	/*if (callbackFunctionFailure != null) {
					callbackFunctionFailure(result, textStatus);
				} else {
					var errorContainer = $('div#retrievalFailure');
					defaultFormErrorHandler(result, errorContainer);
				} */
				alert("Internet Connection Not Available");
			}
		ajaxCallStop();
		}
	});
}

function defaultFormErrorHandler(result, errorContainer,formEle) {
	var errorInfo = {};
	var template = $('#genericErrorTpl').html();
	message = "Internal server error, Please try again.";
	errorInfo['message'] = message;		
	var html = Mustache.to_html(template, errorInfo);
	if (!errorContainer) {
		errorContainer = $('div#error');
	}
	$(errorContainer).html(html);
	$(errorContainer).show();
}

function displayFormSuccess(message) {
	var html = '<ul><li>' + message + '</li></ul>';
	$('#formSuccess').html(html);
}

function setupArticalDetail(){
var url='https://filipinotimes.ae/mobile/recent_post.php';

document.addEventListener("offline", onOffline, false);
function onOffline() {
	$('body').find('div#offline').show()
	return false;
}
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}
function articalDetails(data) {
var articles=new Array();
var articleData=new Array();

var articlesCat=new Array();
var articleDataCat=new Array();

$.each(data.articles, function( index, article ) {
  var id='article'+index;
  var next=parseInt(index)+1;
  var prv=parseInt(index)-1;
  var idPrv='article'+prv;
  var idNext='article'+next;
  var menuId='menu'+index;
  if(index <5){
  var customObject={'image':article.image,'title':article.title,'date':date,'id':id,'idNext':idNext,'idPrv':idPrv};
  articles.push(customObject);
  }else{
  //Date  added to article page
  var pubDate = new Date(article.published);
  var date = pubDate.getFullYear()+'-'+dateConversion(pubDate.getMonth())+'-'+dateConversion(pubDate.getDate())+' '+dateConversion(pubDate.getHours())+':'+dateConversion(pubDate.getMinutes())+':'+dateConversion(pubDate.getSeconds());
  var customObject={'image':article.image,'title':article.title,'summary':article.summary,'gallerydata':article.gallerydata,'date':date,'id':id};
  articleData.push(customObject);
  }
  article['id']=id;
  article['idNext']=idNext;
  article['menuId']=menuId;
  article['idPrv']=idPrv;
});

$.each(data.articles_cat, function( index, articlesCat ) {
  var id='articlecat'+index;
  var next=parseInt(index)+1;
  var prv=parseInt(index)-1;
  var idPrv='articlecat'+prv;
  var idNext='articlecat'+next;
  var menuId='menu'+index;
 
  //Date  added to article page
  var pubDate = new Date(articlesCat.published);
  var date = pubDate.getFullYear()+'-'+dateConversion(pubDate.getMonth())+'-'+dateConversion(pubDate.getDate())+' '+dateConversion(pubDate.getHours())+':'+dateConversion(pubDate.getMinutes())+':'+dateConversion(pubDate.getSeconds());
  var customObject={'image':articlesCat.image,'title':articlesCat.title,'summary':articlesCat.summary,'gallerydata':articlesCat.gallerydata,'date':date,'id':id,'category':articlesCat.category,'cat_class':articlesCat.cat_class,'cat_link':articlesCat.cat_link};
  articleDataCat.push(customObject);
  
  articlesCat['id']=id;
  articlesCat['idNext']=idNext;
  articlesCat['menuId']=menuId;
  articlesCat['idPrv']=idPrv;
});


var articleSliderData={'articles':articles};
var articleListData={'articles':articleData};
var articleListDataCat={'articlescat':articleDataCat};
	var sliderTemplate = $('#sliderDivTmp').html();
	var html = Mustache.to_html(sliderTemplate,articleSliderData);
	$('#sliderDiv').html(html);
	
	var articleListTemplate = $('#articleDivTmp').html();
	var articleListHtml = Mustache.to_html(articleListTemplate,articleListData);
	$('#content').html(articleListHtml);
	
	var pageDivTemplate = $('#pageDivTmp').html();
	var articleListHtml = Mustache.to_html(pageDivTemplate,data);
	$('body').append(articleListHtml);
	
	// article category wise 
	
	var articleListTemplateCat = $('#articleDivTmpCat').html();
	var articleListHtmlcat = Mustache.to_html(articleListTemplateCat,articleListDataCat);
	
	$('#contentcat').html(articleListHtmlcat);
	
	var pageDivTemplateCat = $('#pageDivTmpCat').html();
	var articleListHtmlCat = Mustache.to_html(pageDivTemplateCat,data);
	$('body').append(articleListHtmlCat);
	
	//End  article category wise  
	
	$.mobile.defaultPageTransition = "fade";
	//var swiper = new Swiper('.swiper-container');
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=279430378757286";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//var myApp = new Framework7(); 
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationClickable: true,
	spaceBetween: 20,
	loop: true
});	
var swiper = new Swiper('.swiper-container_home', {
        pagination: '.swiper-pagination_home',
        paginationClickable: true
    });
$.ajax({
  url: "https://filipinotimes.ae/mobile/apps-ads.php",
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  }
})
  .done(function( data ) {
	  var obj = jQuery.parseJSON(data);
	  
     $(".adfooter").html(obj.footerad);
	 $(".bannerbelow_ad").html(obj.headerad);
	 $("#inlinead").html(obj.popupad);
  });

$.ajax({
  url: "http://filipinotimes.ae/mobile/video.php",
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  }
})
  .done(function( data ) {
	   var obj = jQuery.parseJSON(data);
	  
	   var video = obj.data;	   
	   var htmldata = '<ul>';
	   $.each( video, function( i, val ) {
		   var addcss = '';
		  if (i % 2 === 0) {addcss = 'odd';}
   		  else {addcss = 'even'; }
		htmldata += '<li class="'+addcss+'"><a id="myBtn" data-videoid="'+val.id+'" class="clickiframe"><img src="'+val.picture+'" alt=""> <span class="fa favideo"><img src="images/video_icon.png" /></span></a> </</li>';
		});
		htmldata += '</ul>';
	    $("#video_section_thumb").html(htmldata);
		//$(".youtube").colorbox({iframe:true, innerWidth:'90%', innerHeight:'90%'});
		$("#video_section_thumb").on("click",".clickiframe", function(){
					// Get the modal
		$( "#iframe_bind" ).empty();
		var modal = document.getElementById('myModal');
		 modal.style.display = "block";
		// Get the button that opens the modal
		var btn = document.getElementById("myBtn");
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		// When the user clicks the button, open the modal 
		
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
			modal.style.display = "none";
			$( "#iframe_bind" ).empty();
		}
  		var videoid = $(this).data('videoid');
		$('#iframe_bind').attr('src', 'https://www.facebook.com/video/embed?video_id='+videoid+'')
		$("#iframe_bind").html('<iframe src="https://www.facebook.com/v2.3/plugins/video.php?allowfullscreen=true&autoplay=true&href=https://www.facebook.com/redbull/videos/'+videoid+'/" width="90%" height="75%" allowfullscreen></iframe>');
		
		});

  });
  
$(document).ready(function(ev) {
	
  var toggle = $('#ss_toggle');
  var menu = $('.ss_menu');
  var rot;
  
  $('.ss_toggle').on('click', function(ev) {
	 
    rot = parseInt($(this).data('rot')) - 180;
    $( this ).closest( '.ss_menu' ).css('transform', 'rotate(' + rot + 'deg)');
    $( this ).closest( '.ss_menu' ).css('webkitTransform', 'rotate(' + rot + 'deg)');
    if ((rot / 180) % 2 == 0) {
      //Moving in
      $( this ).closest( '.ss_toggle' ).parent().addClass('ss_active');
      $( this ).closest( '.ss_toggle' ).addClass('close');
    } else {
      //Moving Out
       $( this ).closest( '.ss_toggle' ).parent().removeClass('ss_active');
      $( this ).closest( '.ss_toggle' ).removeClass('close');
    }
    $(this).data('rot', rot);
  });

  menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    if ((rot / 180) % 2 == 0) {
		//$( this ).closest( '.ss_menu div i' ).addClass('ss_animate');
     // $('.ss_menu div i').addClass('ss_animate');
    } else {
		//$( this ).closest( '.ss_menu div i' ).removeClass('ss_animate');
     // $('.ss_menu div i').removeClass('ss_animate');
    }
  });
  
});
// for pause video of a page
$('body').on("click", "a.bkcbtn", function(event) {
	var currentVideo=$(this).closest('div').find('div.itemimg').html();
	$(this).closest('div').find('div.itemimg').empty();
	$(this).closest('div').find('div.itemimg').html(currentVideo);
	$.mobile.changePage( "#home", {
    transition: "slide",
    reverse: false,
    changeHash: false
});

});	
$('body').on("click", "#articalDetails", function(event) {
		var currentId=$(this).data('id');
		var currentDiv=$('body').find('input#currentDiv').val();
		$('body').find('div#'+currentDiv).css('display','none');
		$('body').find("div#"+currentId).css('display','block');
		$('body').find('input#currentDiv').val("7");
		window.scrollTo(500, 0);
		currentDiv=currentId;
	});
}
/*
function setupArtandcultureDetails(){
var url='http://filipinotimes.ae/mobile/entertainment.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}
function setupLifestyleDetails(){
var url='http://filipinotimes.ae/mobile/entertainment.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);} 
function setupScienceTechnologyDetails(){
var url='http://filipinotimes.ae/mobile/entertainment.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);}*/

//News
function setupEconomyDetails(){
var url='https://filipinotimes.ae/mobile/news.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

function setupeditorDetails(){
var url='https://filipinotimes.ae/mobile/editorchoice.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}
//Sports
function setupSportsDetails(){
var url='https://filipinotimes.ae/mobile/sports.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

//Entertainment
function setupEntertainmentDetails(){
var url='https://filipinotimes.ae/mobile/entertainment.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

//Photo Gallery
function setupMultimediaphoto(){
var url='https://filipinotimes.ae/mobile/photogallery.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

//Video Gallery
function setupMultimedivideo(){
var url='https://filipinotimes.ae/mobile/video.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

//Bug fixed date convertor with formatyyyy-mm-dd hh:mm:ss
function dateConversion(date){
 if(date.toString().length==1){
 return '0'+date;
 } else{
 	return date;
 }}
 
 
 
 //Home Sports
function setupHomeSportsDetails(){
var url='https://filipinotimes.ae/mobile/sports.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalHomeDetails(data);
		},
		null
);}

 
 function articalHomeDetails(data) {
var articles=new Array();
var articleData=new Array();

$.each(data.articles, function( index, article ) {
  var id='sportarticle'+index;
  var next=parseInt(index)+1;
  var prv=parseInt(index)-1;
  var idPrv='sportarticle'+prv;
  var idNext='sportarticle'+next;
  var menuId='sportmenu'+index;

  //Date  added to article page
  var pubDate = new Date(article.published);
  var date = pubDate.getFullYear()+'-'+dateConversion(pubDate.getMonth())+'-'+dateConversion(pubDate.getDate())+' '+dateConversion(pubDate.getHours())+':'+dateConversion(pubDate.getMinutes())+':'+dateConversion(pubDate.getSeconds());
  var customObject={'image':article.image,'title':article.title,'summary':article.summary,'gallerydata':article.gallerydata,'date':date,'id':id};
  articleData.push(customObject);
  
  article['id']=id;
  article['idNext']=idNext;
  article['menuId']=menuId;
  article['idPrv']=idPrv;
});
//var articleSliderData={'articles':articles};
var articleListData={'articles':articleData};
	//var sliderTemplate = $('#sliderDivTmp').html();
///	var html = Mustache.to_html(sliderTemplate,articleSliderData);
//	$('#sliderDiv').html(html);
	var articleListTemplate = $('#articleSportDivTmp').html();
	var articleListHtml = Mustache.to_html(articleListTemplate,articleListData);
	$('#sportscontent').html(articleListHtml);
	var pageDivTemplate = $('#sportspageDivTmp').html();
	var articleListHtml = Mustache.to_html(pageDivTemplate,data);
	$('body').append(articleListHtml);
	$.mobile.defaultPageTransition = "fade";
	//var swiper = new Swiper('.swiper-container');
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=279430378757286";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//var myApp = new Framework7(); 

$(document).ready(function(ev) {
	
  var toggle = $('#ss_toggle');
  var menu = $('.ss_menu');
  var rot;
  
  $('.sports_ss_toggle').on('click', function(ev) {
	 
    rot = parseInt($(this).data('rot')) - 180;
    $( this ).closest( '.sports_ss_menu' ).css('transform', 'rotate(' + rot + 'deg)');
    $( this ).closest( '.sports_ss_menu' ).css('webkitTransform', 'rotate(' + rot + 'deg)');
    if ((rot / 180) % 2 == 0) {
      //Moving in
      $( this ).closest( '.sports_ss_toggle' ).parent().addClass('ss_active');
      $( this ).closest( '.sports_ss_toggle' ).addClass('close');
    } else {
      //Moving Out
       $( this ).closest( '.sports_ss_toggle' ).parent().removeClass('ss_active');
      $( this ).closest( '.sports_ss_toggle' ).removeClass('close');
    }
    $(this).data('rot', rot);
  });

  menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    if ((rot / 180) % 2 == 0) {
		//$( this ).closest( '.ss_menu div i' ).addClass('ss_animate');
     // $('.ss_menu div i').addClass('ss_animate');
    } else {
		//$( this ).closest( '.ss_menu div i' ).removeClass('ss_animate');
     // $('.ss_menu div i').removeClass('ss_animate');
    }
  });
  
});


}

 //Home entertainment
function setupHomeEntertainmentDetails(){
var url='https://filipinotimes.ae/mobile/entertainment.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalEntertainmentDetails(data);
		},
		null
);}

 
 function articalEntertainmentDetails(data) {
var articles=new Array();
var articleData=new Array();

$.each(data.articles, function( index, article ) {
  var id='entertainmentarticle'+index;
  var next=parseInt(index)+1;
  var prv=parseInt(index)-1;
  var idPrv='entertainmentarticle'+prv;
  var idNext='entertainmentarticle'+next;
  var menuId='entertainmentmenu'+index;

  //Date  added to article page
  var pubDate = new Date(article.published);
  var date = pubDate.getFullYear()+'-'+dateConversion(pubDate.getMonth())+'-'+dateConversion(pubDate.getDate())+' '+dateConversion(pubDate.getHours())+':'+dateConversion(pubDate.getMinutes())+':'+dateConversion(pubDate.getSeconds());
  var customObject={'image':article.image,'title':article.title,'summary':article.summary,'gallerydata':article.gallerydata,'date':date,'id':id};
  articleData.push(customObject);
  
  article['id']=id;
  article['idNext']=idNext;
  article['menuId']=menuId;
  article['idPrv']=idPrv;
});
//var articleSliderData={'articles':articles};
var articleListData={'articles':articleData};
	//var sliderTemplate = $('#sliderDivTmp').html();
///	var html = Mustache.to_html(sliderTemplate,articleSliderData);
//	$('#sliderDiv').html(html);
	var articleListTemplate = $('#articleEntertainmentDivTmp').html();
	var articleListHtml = Mustache.to_html(articleListTemplate,articleListData);
	$('#entertainmentcontent').html(articleListHtml);
	var pageDivTemplate = $('#entertainmentpageDivTmp').html();
	var articleListHtml = Mustache.to_html(pageDivTemplate,data);
	$('body').append(articleListHtml);
	$.mobile.defaultPageTransition = "fade";
	//var swiper = new Swiper('.swiper-container');
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=279430378757286";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//var myApp = new Framework7(); 


$(document).ready(function(ev) {
	
  var toggle = $('#ss_toggle');
  var menu = $('.ss_menu');
  var rot;
  
  $('.entertainment_ss_toggle').on('click', function(ev) {
	 
    rot = parseInt($(this).data('rot')) - 180;
    $( this ).closest( '.entertainment_ss_menu' ).css('transform', 'rotate(' + rot + 'deg)');
    $( this ).closest( '.entertainment_ss_menu' ).css('webkitTransform', 'rotate(' + rot + 'deg)');
    if ((rot / 180) % 2 == 0) {
      //Moving in
      $( this ).closest( '.entertainment_ss_toggle' ).parent().addClass('ss_active');
      $( this ).closest( '.entertainment_ss_toggle' ).addClass('close');
    } else {
      //Moving Out
       $( this ).closest( '.entertainment_ss_toggle' ).parent().removeClass('ss_active');
      $( this ).closest( '.entertainment_ss_toggle' ).removeClass('close');
    }
    $(this).data('rot', rot);
  });

  menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    if ((rot / 180) % 2 == 0) {
		//$( this ).closest( '.ss_menu div i' ).addClass('ss_animate');
     // $('.ss_menu div i').addClass('ss_animate');
    } else {
		//$( this ).closest( '.ss_menu div i' ).removeClass('ss_animate');
     // $('.ss_menu div i').removeClass('ss_animate');
    }
  });
  
});


}