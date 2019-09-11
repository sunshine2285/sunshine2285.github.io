/**
 * 数据加载函数
 */

$(function () {
    let id = getUrlParam("id");
    if (id == undefined) {
        $("#content").append("<div class='error'>" + "没有这篇文章！" + "</div>");
    } else {
        //请求服务器获取文章内容
        $.ajax({
            url: localUrl + "/article",
            data: {
                id: id
            },
            success: processResponse
        });
    }

})


function processResponse(response) {
    console.log(response);
    if (response.statusCode == 200) {
        let article = response.data.article;
        $("#title").text(article.title);
        $("#author").text("by " + article.author);
        $("#date").text(article.date);
        $("#views").text(article.views);
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
        $("#content").append(marked(article.contentPath));
        $("#preArticle").text(response.data.preArticle.title);
        $("#preArticle").attr("href", "article.html?id=" + response.data.preArticle.id);
        $("#nextArticle").text(response.data.nextArticle.title);
        $("#nextArticle").attr("href", "article.html?id=" + response.data.nextArticle.id);


    } else
        $("#content").append("<div class='error'>" + response.info + "</div>");
}

/**
 * 视觉动画函数
 */

// 页面显示返回顶部
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(".content").offset().top) {
        $("#gotoTop").fadeIn("slow");
    } else {
        $("#gotoTop").fadeOut("slow");
    }
});

//平滑回到顶部
function gotoTop(acceleration, stime) {
    acceleration = acceleration || 0.1;
    stime = stime || 10;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
    var x = Math.max(x1, Math.max(x2, x3));
    var y = Math.max(y1, Math.max(y2, y3));
    var speeding = 1 + acceleration;
    window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
    if (x > 0 || y > 0) {
        var run = "gotoTop(" + acceleration + ", " + stime + ")";
        window.setTimeout(run, stime);
    }
}