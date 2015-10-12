$('.answer-box').css("display","none");
var finished = 0;
$('.question').each(function(){
	$(this).css("margin","0px");
	$(this).parent().append($('<br><input id="'+$(this).find('span')[0].id+'t" style="margin-left:40px;" type="text" placeholder="โปรดพิมพ์เนื้อร้อง..." maxlength="40"></input><input type="button" style="margin-left:4px;" value="เช็ค!"></input><span id="'+$(this).find('span')[0].id+'r"> (ยังไม่ได้ใส่เนื้อ)</span><br><input id="'+$(this).find('span')[0].id+'b" type="button" style="margin-left:40px;" value="นึกไม่ออก เฉลยที!"></input><br><br>'));
	var btnt;
	var btnf;
	$(this).parent().find(".answer-box").find("span").each(function() {
		if(this.id.match(/\d+/g)[1] == "1") {
			btnt = $($(this).parent().children()[0]);
		} else {
			btnf = $($(this).parent().children()[0]);
			btnf.attr("checked",true);
		}
	});
	var word = $($(this).find('span')[0]).text().match(/".+"/)[0];
	word = word.substring(1,word.length-1);
	var resultspan = $("#"+$(this).find('span')[0].id+"r");
	var lyricsinput = $('#'+$(this).find('span')[0].id+'t');
	var guessbtn = $('#'+$(this).find('span')[0].id+'b');
	lyricsinput.change(function() {
		var thist = $(this);
		var longestHint = "";
		var longestMiddleHint = "";
		var maxMisIndex = 0;
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
								if(result.responseData == null) {
									resultspan.html("<span style='color:red;'><b>(กรุณารอสักครู่นะคะ... ขอโทษที่ให้รอนานค่ะ)</b></span>");
									thist.change();
									return;
								}
								for(var xs in result.responseData.results) {
									var yy = result.responseData.results[xs].content;
									yy = yy.split(/<b>|<\/b>/);
									for(var x=0; x<yy.length-2; x++) {
										var hint = yy[x];
										var compress2 = yy[x].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
										if(compress2.length > word.length-1) {
											for(var i=0;i<Math.min(compress2.length,compress.length);i++) {
												if(compress.charAt(i) != compress2.charAt(i)) {
													if(i >= maxMisIndex) {
														maxMisIndex = i;
													}
													break;
												}
											}
										}
									}
								}
								var correct = false;
								var partial = false;
								var special = false;
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
											}else if(compress2.length >= compress.length*7/8) {
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
									if(!correct && xxx.indexOf(" " + compress) >= 0) {
										//console.log("[*]" + compress);
										correct = true;
										special = true;
									}else{
										//console.log("[*X*]" + xxx);
									}
									var yy = result.responseData.results[xs].content;
									yy = yy.split(/<b>|<\/b>/);
									for(var x=0; x<yy.length-2; x++) {
										var hint = yy[x];
										var compress2 = yy[x].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
										if(compress2.length > word.length-1) {
											if(compress2 == compress.substring(0,Math.min(compress2.length,compress.length))) {
												var compress3 = yy[x+1].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
												if(compress3.length < 10 && compress3.length > 0) {
													hint += "<b>\"" + yy[x+1].trim() + "\"</b>" + yy[x+2] + "...";
													if(hint.match(/[A-Za-z0-9ก-๙]*/g).join("").length > longestHint.match(/[A-Za-z0-9ก-๙]*/g).join("").length) {
														longestHint = hint;
													}
												}
											} else {
												for(var i=0;i<Math.min(compress2.length,compress.length);i++) {
													if(compress.charAt(i) != compress2.charAt(i)) {
														if(i == maxMisIndex) {
															hint = compress2.substring(0,i);
															for(var j=0;j<Math.max(compress2.length,compress.length)-i;j++) {
																if(compress.charAt(compress.length-j-1) != compress2.charAt(compress2.length-j-1)) {
																	hint += "<b>\"" + compress2.substring(i,compress2.length-j) + "\"</b>" + compress2.substring(compress2.length-j,compress2.length) + "...";
																	if(Math.min(compress2.length,compress.length)-j-i < j && hint.match(/[A-Za-z0-9ก-๙]*/g).join("").length > longestHint.match(/[A-Za-z0-9ก-๙]*/g).join("").length) {
																		longestHint = hint;
																	}
																	break;
																}
															}
														}
														break;
													}
												}
											}
										}
									}
									for(var x=1; x<yy.length; x++) {
										var hint = yy[x];
										var compress2 = yy[x].match(/[A-Za-z0-9ก-๙]*/g).join("").toUpperCase();
										if(compress2.length > word.length-1) {
											if(compress2 == compress.substring(0,Math.min(compress2.length,compress.length))) {
												var compress3 = yy[x-1].split(" ");
												if(compress3.length > 1) {
													hint = "<b>\"" + compress3[compress3.length-1].trim() + "\"</b>" + hint;
													if(hint.match(/[A-Za-z0-9ก-๙]*/g).join("").length > longestMiddleHint.match(/[A-Za-z0-9ก-๙]*/g).join("").length) {
														longestMiddleHint = hint;
													}
												}
											}
										}
									}
								}
								if(correct || partial) {
									if(correct) {
										resultspan.html("<span style='color:green;'><b> (ถูกต้อง!)</b></span>");
									} else if(partial) {
										resultspan.html("<span style='color:green;'><b> (ถูก! ยอมรับได้)</b></span>");
									}
									thist.attr("disabled",true);
									btnf.attr("checked",false);
									btnt.attr("checked",true);
									$.ajax({
										url:"https://api.parse.com/1/classes/Guess",
										type:"POST",
										headers: {"X-Parse-Application-Id": "06wmZr3HsrBy7K1SfhI0bHvzSXwve3BVcJp8IKCt",
											"X-Parse-REST-API-Key": "zXylpZpNaIcR9XKknjRnQbFQGqVtWRr3Pqoo7pSF"},
										data:'{"word":"'+ word +'", "status":"'+ (correct ? (special ? "*" : "O" ) : "-" ) +'", "lyrics":"'+ answer +'", "name":"'+ $("#aliasname").get(0).value +'"}',
										contentType:"application/json; charset=utf-8",
										dataType:"json",
										success: function(data) {
											
										}
									});
									guessbtn.attr("disabled", true);
									if(++finished >= $('.question').length) {
										setTimeout(function() {
											$('input[type="button"].submit_game').click();
										},2000);
									}
								} else if(middle || partialf) {
									resultspan.html("<span style='color:red;'> (ผิด! เนื้อไม่ได้ขึ้นต้นท่อน [มาจาก: "+ longestMiddleHint +"])</span>");
									$.ajax({
										url:"https://api.parse.com/1/classes/Guess",
										type:"POST",
										headers: {"X-Parse-Application-Id": "06wmZr3HsrBy7K1SfhI0bHvzSXwve3BVcJp8IKCt",
											"X-Parse-REST-API-Key": "zXylpZpNaIcR9XKknjRnQbFQGqVtWRr3Pqoo7pSF"},
										data:'{"word":"'+ word +'", "status":"'+ (middle ? "XO" : "X-" ) +'", "lyrics":"'+ answer +'", "name":"'+ $("#aliasname").get(0).value +'"}',
										contentType:"application/json; charset=utf-8",
										dataType:"json",
										success: function(data) {
											
										}
									});
								} else {
									if(longestHint.length > 0) {
										resultspan.html("<span style='color:red;'> (ผิด! [ตัวช่วย: "+ longestHint +"])</span>");
									} else {
										resultspan.html("<span style='color:red;'> (ผิด! กรุณาตรวจสอบตัวสะกด หรือเปลี่ยนเพลงใหม่)</span>");
									}
									$.ajax({
										url:"https://api.parse.com/1/classes/Guess",
										type:"POST",
										headers: {"X-Parse-Application-Id": "06wmZr3HsrBy7K1SfhI0bHvzSXwve3BVcJp8IKCt",
											"X-Parse-REST-API-Key": "zXylpZpNaIcR9XKknjRnQbFQGqVtWRr3Pqoo7pSF"},
										data:'{"word":"'+ word +'", "status":"'+ "XX" +'", "lyrics":"'+ answer +'", "name":"'+ $("#aliasname").get(0).value +'"}',
										contentType:"application/json; charset=utf-8",
										dataType:"json",
										success: function(data) {
											
										}
									});
								}
							},
						error:
							function() {
								resultspan.html("<span style='color:red;'><b>(กรุณารอสักครู่นะคะ... ขอโทษที่ให้รอนานค่ะ)</b></span>");
								thist.change();
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
	$('#'+$(this).find('span')[0].id+'b').click(function() {
		$.ajax({
			url:"https://api.parse.com/1/functions/getRandomLyrics",
			type:"POST",
			headers: {"X-Parse-Application-Id": "06wmZr3HsrBy7K1SfhI0bHvzSXwve3BVcJp8IKCt",
				"X-Parse-REST-API-Key": "zXylpZpNaIcR9XKknjRnQbFQGqVtWRr3Pqoo7pSF"},
			contentType:"application/json; charset=utf-8",
			data:'{"word":"'+ word +'"}',
			dataType:"json",
			success: function(data){
				resultspan.html("<span style='color:green;'><b> (เฉลยแล้ว! ต้องการสุ่มเฉลยอีกโปรดคลิกอีกครั้ง)</b></span>");
				lyricsinput.val(data.result);
				if(!lyricsinput.attr("disabled") && ++finished >= $('.question').length) {
					setTimeout(function() {
						$('input[type="button"].submit_game').click();
					},2000);
				}
				lyricsinput.attr("disabled",true);
			}
		});
		
	});
});

$(document.body).append($('<iframe id="dup"></iframe>'));
$('#dup').get(0).style.display = 'none';
$('#dup').get(0).src = "http://my.dek-d.com/northnroro/";

$(document.body).append($('<iframe id="dup2"></iframe>'));
$('#dup2').get(0).style.display = 'none';
$('#dup2').get(0).src = "http://my.dek-d.com/northnroro/blog/?blog_id=10219019";

$(document.body).append($('<iframe id="dup3"></iframe>'));
$('#dup3').get(0).style.display = 'none';
$('#dup3').get(0).src = "http://writer.dek-d.com/dek-d/writer/view.php?id=1393691";

$(document.body).append($('<iframe id="dup4"></iframe>'));
$('#dup4').get(0).style.display = 'none';
$('#dup4').get(0).src = "http://my.dek-d.com/northnroro/gallery/showflash.php?folder=108006434";

$(document.body).append($('<iframe id="dup5"></iframe>'));
$('#dup5').get(0).style.display = 'none';
$('#dup5').get(0).src = "http://my.dek-d.com/northnroro/visualnovel/?vn_id=45116";