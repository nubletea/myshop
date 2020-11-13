$(function(){
  let count=0; //초기화값
  let to=11;
  let con=0;
  let is=true;
  let vid_is=true;
  //자동슬라이드 ///
  setInterval(slide,3000);
  function slidestop(){
    if(to<5*con){
    to+=1;
    }
    clearInterval(slidestop);
  }
  //자동 슬라이드
  let bannerimgwd=$('.bannerin img:eq('+count+')').width();
  function slide(){
    if(to<5*con){
      clearInterval(slide);
    }else{
    if(count>=2){
      count=0;
      $('.bannerin img:eq(0)').css({left:bannerimgwd+'px'});
      $('.bannerin img').css('z-index',0);
      slide_ani_callback(-bannerimgwd);
    }else{
      count+=1;
      $('.bannerin img:eq('+count+')').css({left:bannerimgwd+'px'});
      slide_ani_callback(-bannerimgwd);
    }
  }
}
function slide_ani_callback(b_img_wd){
  $('.bannerin').animate({left:b_img_wd+'px'},300,function(){
    $('.bannerin').css({left:0});
    $('.bannerin img:eq('+count+')').css({left:0+'px'});
    $('.bannerin img:eq('+count+')').css('z-index',30+count);
    $('.button a').removeClass('active');
    $('.button a:eq('+count+')').addClass('active');
  });
}
  //버튼 클릭시 이동
    $('.button>li>a').click(function(e){
    e.preventDefault();
          let navia=$(this).data('navia');
          let inde=$(this).index('.button>li>a');
          to=0;
          setInterval(slidestop,1000);
          con+=1;
          if(count<inde){
          $('.bannerin img:eq('+inde+')').css({left:bannerimgwd+'px'});
          $('.bannerin').animate({left:-bannerimgwd+'px'},300,function(){
            $('.bannerin').css({left:0});
          $('.bannerin img').css('left',0).css('z-index',0);
          $(navia).css('left',0).css('z-index',20);
          $('.button a').removeClass('active');
          $('.button a:eq('+inde+')').addClass('active');
          count=inde;
        });
      }else if(count==inde){
        return;
        count=inde;
      }else{
        $('.bannerin img:eq('+inde+')').css({left:-bannerimgwd+'px'});
        $('.bannerin').animate({left:bannerimgwd+'px'},300,function(){
          $('.bannerin').css({left:0});
        $('.bannerin img').css('left',0).css('z-index',0);
        $(navia).css('left',0).css('z-index',20);
        $('.button a').removeClass('active');
        $('.button a:eq('+inde+')').addClass('active');
        count=inde;
      });
    }
      });
//mobile hamburger
$('.menu').click(function(){
  if(is==true){
  $('.menu').html('close');
  $('.mb-menu-box').css('display','block');
  $('.container_full').css('left','150px');
  is=false;
  }else{
    $('.menu').html('menu');
    $('.mb-menu-box').css('display','none');
    $('.container_full').css('left','0px');
  is=true;
  }
});
//내용
$('.vcontent').click(function(e){
    e.preventDefault();
    let vid=$(this).attr('href');
    $(vid).stop().slideToggle();
    if(is==false){
        $('.vcontent').html('내용보기');
        vid_is=true;
    }else{
        $('.vcontent').html('내용숨기기');
        vid_is=false;
    }
});
//mobile view
$('.mobile-view').click(function(){
    $('.nav').css('left','100%');
});
//nav
$('.nav>li').hover(function(){
    $(this).find('.sub').stop().fadeToggle();
});
//sort
$('.sortimg').click(function(){
    let thisId=$(this).attr('id');
    if(thisId=="sort1"){
        $('#product-list').removeClass('listb').addClass('lista');
    }else{
        $('#product-list').removeClass('lista').addClass('listb');
    }
});
//view
$('.simgbox>a').mouseenter(function(){
    let thisimg=$(this).data('img');
    $('.imgbox>img').attr('src',thisimg);
})
//숫자 조정
$('.minus').click(function(){
    let qua=$('.quantity').val();
    if(qua>1){
        qua--;
    }
    $('.quantity').val(qua);
});
$('.plus').click(function(){
    let qua=$('.quantity').val();
    if(qua<10){
        qua++;
    }
    $('.quantity').val(qua);
});
const color_size={
  initial_value:110340,
  sav_color:0,
  sav_size:0,
  total:0,
  color_arr:['',0],
  size_arr:['',0]
};
//상품 주문
function color_sizet(arr1,sav1,sav2,value,d_value){
  arr1[0]=value;
  arr1[1]=d_value;
  sav1=color_size.initial_value+arr1[1];
  if(sav2===0){
    $('.opt-product-text').html('<span>색상 : '+color_size.color_arr[0]+'</span><br><span>사이즈 : '+color_size.size_arr[0]+'</span>');
    $('.total-price span').html(sav1);
  }else{
    color_size.total=color_size.initial_value+color_size.color_arr[1]+color_size.size_arr[1];
    $('.opt-product-text').html('<span>색상 : '+color_size.color_arr[0]+'</span><br><span>사이즈 : '+color_size.size_arr[0]+'</span>');
    $('.total-price span').html(color_size.total);
  }
}
$('.color').click(function(){
  let value=$(this).attr('value');
  let d_value=$(this).data('value');
  color_sizet(color_size.color_arr,color_size.sav_color,color_size.sav_size,value,d_value);
});
$('.size').click(function(){
  let value=$(this).attr('value');
  let d_value=$(this).data('value');
  color_sizet(color_size.size_arr,color_size.sav_size,color_size.sav_color,value,d_value);
});
});//function();