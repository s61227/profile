$(document).ready(function(){

/*--- 變數宣告 ---*/

var mainNavTotal=$('.topSide nav li').length;		//主選單的數目 
var sectionPos = Math.floor($('.page').position().top);  //sectionPos的Top位置
var $animation_elements = $('.animation-element');
var $window = $(window);

/*header==================================================================*/

function updateNavigatePosition() {
      console.log('hi');
	//判斷是否要出現導覽底線
	if( Math.floor($window.scrollTop()) >= sectionPos){
		$('.navigate').css('opacity',1);
	}else{
		$('.navigate').css('opacity',0);
	}

	//各頁位置判斷
	$('section').each(function(i){
		if($(this).offset().top <= $window.scrollTop()+200){
			$('nav li a').filter('.current').removeClass('current');
			$('nav li a').eq(i).addClass('current');
			
			var nowOut=$('.topSide nav li a.current').parent().index()+1;
			$('.navigate').css('opacity',1).stop().animate({'right':(mainNavTotal-nowOut)*100+'px'},500,'easeOutQuint');
		}
	}); //$('section').each END
}

// Scroll事件
$window.on("scroll", updateNavigatePosition); //$(window).scroll END

//nav的hover設定
$('nav li a').hover(
	function() { /* 當滑入時 */
	
	//目前滑入的是誰
	var now = $(this).parent().index()+1;
	//移動導覽列
	$('.navigate').css('opacity',1).stop().animate({'right':(mainNavTotal-now)*100+'px'},500,'easeOutQuint');

	}, function() { /* 當滑出時 */
		updateNavigatePosition();
	}
);

//nav Click捲動至各分頁
$('nav li a').click(function() {
	/*
	//設定所有的a元素移除current的類別名稱
	$('nav li a').filter('.current').removeClass('current');
	//設定現在點選的a元素增加current的類別名稱
	$(this).addClass('current');*/	

	$window.off("scroll", updateNavigatePosition);
	$('nav li a').off("mouseleave");

	//設定html及body進行animate動畫, 控制scrollTop屬性位置
	var navClickIndex =$(this).parent().index();
	var sectionTop= $('section').eq(navClickIndex).offset().top; 
	$('html,body').stop().animate({scrollTop:sectionTop}, 1000, function() { 
      
		updateNavigatePosition();
		$window.on("scroll", updateNavigatePosition);
		$('nav li a').on( "mouseleave", updateNavigatePosition);
	});
	$('body').toggleClass('menu-show');

});


function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

// Home按鈕至首頁
$('.topSide h1 a').click(function() {
	$('html,body').animate({scrollTop:0},1000);
});

// 捲至下一頁按鈕
$('header>a.nextpage').click(function() {
	$('html,body').animate({scrollTop: $('section').eq(0).offset().top},1000);
});

// menu_bar click事件
$('.menu_bar .fa').click(function(){
    $('body').toggleClass('menu-show');
});



/*section.page .page5==================================================================*/

// 作品篩選
	$(".tag a").click(function(){
	  $(".tag a").removeClass("isactive");
	  $(this).addClass("isactive");
	  var tag = $(this).attr("href").replace("#", "");
	  $(".imgblock1>figure").hide();
	  if(tag == "all"){
		$(".imgblock1>figure").show();
	  }else{
		$('.imgblock1>figure[data-tag*="'+tag+'"]').show();
	  }
	});

});