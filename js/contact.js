// 添加留言
function comment() {
    let name = $("#name").val();
    let email = $("#email").val();
    let content = $("#content").val();
    let date = new Date().format("yyyy-MM-dd hh:mm:ss");

    var url = localUrl + "/comment_add";
    $.ajax({
        url: url,
        data: {
            name: name,
            email: email,
            content: content,
            date: date
        },
        success: function (result) {
            console.log(result);
            $("#content").val("");
            var message = $(".message:last").clone();
            message.removeAttr("style");
            message.find(".username").text(name);
            message.find(".email").text(email);
            message.find(".message-content").text(content);
            message.find(".date").text(date);
            $(".message-box").prepend(message);
        }
    });
}

function test() {

}


$(document).ready(function () {
    // 页面加载完成后请求数据
    var url = localUrl + "/comment_get";
    $.ajax({
        url: url,
        data: {},
        success: function (result) {
            for (let i = 0; i < result.length; i++) { 
                var message = $(".message:last").clone();
                message.removeAttr("style");
                message.find(".username").text(result[i].name);
                message.find(".email").text(result[i].email);
                message.find(".message-content").text(result[i].content);
                message.find(".date").text(result[i].date);
                $(".message-box").prepend(message);
            }
        }
    });
});