$('.answer-box').css("display","none");
$('.question').each(function(){
	$(this).css("margin","0px");
	$(this).parent().append($('<br><input id="'+$(this).find('span')[0].id+'t" style="margin-left:40px;" type="text" placeholder="โปรดพิมพ์เนื้อร้อง..."></input><span id="'+$(this).find('span')[0].id+'r"> (ยังไม่ได้ใส่เนื้อ)</span><br><br>'));
	var word = $($(this).find('span')[0]).text().match(/".+"/)[0];
	word = word.substring(1,word.length-1);
	var resultspan = $("#"+$(this).find('span')[0].id+"r");
	$('#'+$(this).find('span')[0].id+'t').change(function() {
		console.log($(this).val() + "     " + word);
		if($(this).val().length > 0) {
			if($(this).val().indexOf(word) == 0) {
				var compress = $(this).val().match(/[A-Za-z0-9ก-๙]*/g).join("");
				console.log("regex : " + compress);
				if(compress.length > 25) {
					$.ajax({
						url:
							"https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q="+word,
						dataType:
							"jsonp",
						success:
							function(result){
								alert(result.responseData.results[0].content);
							}
					});
				} else {
					resultspan.html("<span style='color:red;'> (เนื้อสั้นเกินไป ขาดอีก"+(25-compress.length)+"ตัวอักษร)</span>");
				}
			} else if($(this).val().indexOf(word) < 0) {
				resultspan.html("<span style='color:red;'> (ไม่มีคำที่กำหนด)</span>");
			} else {
				resultspan.html("<span style='color:red;'> (คำที่กำหนดไม่ได้ขึ้นต้นท่อน)</span>");
			}
		} else {
			resultspan.html("<span> (ยังไม่ได้ใส่เนื้อ)</span>");
		}
	});
});