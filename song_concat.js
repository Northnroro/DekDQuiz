﻿$.ajax({
url:
"https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=ทดสอบ",
dataType:
"jsonp",
success:
function(result){
alert(result.responseData.results[0].content);
}
});