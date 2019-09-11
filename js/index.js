// 导航条变化函数
$(window).scroll(function () {
    let oTop = $("#index-page-body").offset().top -80;
    if($(window).scrollTop() >= oTop){
        $("#navbar").removeClass("index-nav");
    }else{
        $("#navbar").addClass("index-nav");
    }
});
