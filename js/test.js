const localUrl = "http://localhost:8080/mysiteServer";

function test() {
    var url = "http://localhost:8080/mysiteServer/article";
    $.ajax({
        url: url,
        data: {},
        success: function (result) {
            console.log(result);
            $("#test").append(markdown.toHTML(result));
        }
    });
}



$(document).ready(function () {
    const result = "/article";
    $.ajax({
        url: localUrl + result,
        success: function (result) {
            console.log(result);
        }
    });
//     $.getJSON(localUrl + result + "?jsoncallback=?", function(data) {
//         console.log(data);
// });
});