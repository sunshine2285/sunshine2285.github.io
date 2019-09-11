$(function () {
    let tag = getUrlParam("tag");
    if(tag == "qianduan")
        tag = "前端";
    console.log(tag);
    $.ajax({
        url: localUrl + "/blog",
        data: {
            tag: tag 
        },
        success: processResponse,
        error: function(response){
            // TODO 处理失败情况
        }
    });
})

function processResponse(response) {
    console.log(response);
    if (response.statusCode == 200) {
        let articleList = response.data.articleList;
        for (let i = 0; i < articleList.length; i++) {
            let article = $("#article-template").clone();
            article.removeAttr("id");
            article.removeAttr("style");

            article.find(".source-type").text("【" + articleList[i].type + "】");
            article.find(".article-title").text(articleList[i].title);
            article.find(".article-title").attr("href", "article.html?id=" + articleList[i].id);
            article.find(".article-date").text(articleList[i].date.substr(0, 10));
            article.find(".article-img").attr("src", localUrl + articleList[i].coverUrl);
            article.find(".article-summary").text(articleList[i].summary);

            var tags = new Array();
            tags = articleList[i].tags.split(",");
            console.log(tags);
            
            article.find(".article-tag").eq(0).text(tags[0]);
            article.find(".article-tag").eq(1).text(tags[1]);
            article.find(".article-tag").eq(2).text(tags[2]);

            article.find(".article-view-number").text(articleList[i].views);
            article.find(".article-comment-number").text(articleList[i].comments);
            $(".article-list").append(article);
        }
    }
}