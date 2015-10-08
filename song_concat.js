﻿$('.answer-box').css("display","none");
$('.question').each(function(){
	$(this).css("margin","0px");
	$(this).parent().append($('<br><input id="'+$(this).find('span')[0].id+'t" style="margin-left:40px;" type="text" placeholder="โปรดพิมพ์เนื้อร้อง..."></input><span id="'+$(this).find('span')[0].id+'r"> (ยังไม่ได้ใส่เนื้อ)</span><br><br>'));
	var word = $($(this).find('span')[0]).text().match(/".+"/)[0];
	word = word.substring(1,word.length-1);
	var resultspan = $("#"+$(this).find('span')[0].id+"r");
	$('#'+$(this).find('span')[0].id+'t').change(function() {
		//console.log($(this).val() + "     " + word);
		if($(this).val().length > 0) {
			if($(this).val().indexOf(word) == 0) {
				var answer = $(this).val();
				var compress = answer.match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
				//console.log("regex : " + compress);
				if(compress.length >= 20) {
					resultspan.html("<span style='color:orange;'> (กำลังตรวจสอบ...)</span>");
					$.ajax({
						url:
							"https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q="+answer,
						dataType:
							"jsonp",
						success:
							function(result){
								var correct = false;
								var partial = false;
								var partialf = false;
								var middle = false;
								for(var xs in result.responseData.results) {
									var xx = " " + result.responseData.results[xs].content;
									xx = xx.split(/<\/b>/);
									var xxx = " ";
									for(var x=0; x<xx.length; x++) {
										var compress2 = xx[x];
										if(compress2.split(/ <b>/).length > 1) {
											xxx +=  compress2.split(/ <b>/)[0].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
											xxx +=  " " + compress2.split(/ <b>/)[1].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
											compress2 = compress2.split(/ <b>/)[1];
											compress2 = compress2.match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
											if(compress2 === compress) {
												//console.log("[O] " + compress2);
												correct = true;
											}else if(compress2.length >= compress.length-1) {
												//console.log("[-] " + compress2);
												partial = true;
											}else{
												//console.log("[X]" + compress2);
											}
										} else if(compress2.split(/<b>/).length > 1) {
											xxx +=  compress2.split(/<b>/)[0].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
											xxx +=  compress2.split(/<b>/)[1].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
											compress2 = compress2.split(/<b>/)[1];
											compress2 = compress2.match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
											if(compress2 === compress) {
												//console.log("[XO] " + compress2);
												middle = true;
											}else if(compress2.length >= compress.length) {
												//console.log("[X-] " + compress2);
												partialf = true;
											}else{
												//console.log("[XX]" + compress2);
											}
										}
									}
									if(xxx.indexOf(" " + compress) >= 0) {
										//console.log("[*]" + compress);
										correct = true;
									}else{
										//console.log("[*X*]" + xxx);
									}
								}
								if(correct) {
									resultspan.html("<span style='color:green;'> (ถูกต้อง!)</span>");
								} else if(partial) {
									resultspan.html("<span style='color:green;'> (ถูก! ยอมรับได้)</span>");
								} else if(middle) {
									resultspan.html("<span style='color:red;'> (ผิด! เนื้อดังกล่าวไม่ได้ขึ้นต้นท่อน)</span>");
								} else if(partialf) {
									resultspan.html("<span style='color:red;'> (ผิด! เนื้อดังกล่าวไม่ได้ขึ้นต้นท่อน)</span>");
								} else {
									resultspan.html("<span style='color:red;'> (ผิด! กรุณาตรวจสอบตัวสะกด เว้นวรรค หรือเปลี่ยนเพลงใหม่)</span>");
								}
							}
					});
				} else {
					resultspan.html("<span style='color:blue;'> (เนื้อสั้นเกินไป ขาดอีก"+(20-compress.length)+"ตัวอักษร)</span>");
				}
			} else if($(this).val().indexOf(word) < 0) {
				resultspan.html("<span style='color:blue;'> (ไม่มีคำที่กำหนด)</span>");
			} else {
				resultspan.html("<span style='color:blue;'> (คำที่กำหนดไม่ได้ขึ้นต้นท่อน)</span>");
			}
		} else {
			resultspan.html("<span> (ยังไม่ได้ใส่เนื้อ)</span>");
		}
	});
});