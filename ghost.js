var q1answered = 0;
var q8answered = 0;
$('[id^=a1_]').parent().click(function(){
	q1answered = 1;
	if(q8answered == 1) {
		$('[id^=a7_]').each(function(){
			$($(this).parent().children()[0]).removeAttr('checked');
			$(this).parent().parent().removeClass("ansselected subborderbg subborderfont");
		});
		$('#q7').text("แน่ใจนะว่าไม่กลัวผี?");
		$('#a7_1').text("คราวนี้มั่นใจแล้วว่าไม่กลัวแน่นอน!!");
		$('#a7_2').each(function(){
			$($(this).parent().children()[0]).attr('checked', 'checked');
			$(this).parent().parent().addClass("ansselected subborderbg subborderfont");
		});
		$('#q8').text("เข็มถูกดึงออกไปจากตุ๊กตาวูดูเป็นจำนวนกี่เข็ม?");
		$('#a8_2').each(function(){
			$($(this).parent().children()[0]).removeAttr('checked');
			$(this).parent().parent().removeClass("ansselected subborderbg subborderfont");
			$(this).text("ไม่มีสักเข็ม");
			q1answered = 0;
		});
		$('#a8_1').parent().parent().removeAttr('style');
		$('#a8_3').parent().parent().removeAttr('style');
		$('#a8_4').parent().parent().removeAttr('style');
		q8answered = 0;
		$('[id^=a8_]').parent().click(function() {
			$('[id^=a8_]').parent().unbind('click');
			for(var i=0; i<20;i++) {
				$('html, body').animate({scrollTop : "+=50"}, 50);
			}
			$('.submit_game').mouseover(function(){
				$('#qfin').removeAttr('style');
				$('#qfin')[0].style.position = 'fixed';
				$('#qfin')[0].style.zIndex = 1000;
				$('#qfin').offset({top : $('.submit_game').offset().top-$(document).scrollTop()-200, left : $('.submit_game').offset().left-130});
				$('#qfin').width(350);
				$('#qfin').height(665);
				$('#qfin').animate({width : "+=100px", height : "+=190px", left : "-=50px", top : "-=95px"}, 70);
				$('#qfin').delay(1500);
				$('#qfin').animate({top : "+=650px", opacity : 0}, 3000);
				$('.submit_game').unbind('mouseover');
			});
		});
	}
});

$('#q2').append($('<br>'));
$('#q2').append($('<img id="q2_1" src="http://image.dek-d.com/27/0287/3755/119924444">'));

var q3q = $('#q3').text();
$('#q3').empty();
$('#q3').append($("<span>"+q3q.split("{{$url}}")[0]+" </span>"));
$('#q3').append($("<a style='color:red;' href='http://comic.naver.com/webtoon/detail.nhn?titleId=350217&no=31' target='_blank'><u>คลิกเพื่ออ่านการ์ตูน</u></a>"));
$('#q3').append($("<span>"+q3q.split("{{$url}}")[1]+"</span>"));
$('#q3').append($("<img src='http://s19.postimg.org/fc2bdqean/sad.png' style='display:none;'>"));
$('#q3').append($("<img src='http://s19.postimg.org/4b768pm1r/ghost.png' style='display:none;'>"));
$('#q3').append($("<img id='qfin' src='http://s19.postimg.org/o9n1b36qr/hand.png' style='display:none;'>"));

$('[id^=a3_]').each(function(index){
	this.innerHTML = "<img src='http://s19.postimg.org/7kllf6a5b/smile.png'>";
	var deg = "rotate("+(parseInt(this.id.match(/\d+/g)[1])*40+115)+"deg)";
	$(this).children().css({
		"-webkit-transform": deg,
		"-moz-transform": deg,
		"transform": deg
	});
});
$('[id^=a3_]').parent().click(function(){
	$('[id^=a3_]').each(function(){
		this.innerHTML = "<img src='http://s19.postimg.org/fc2bdqean/sad.png'>";
		var deg = "rotate("+(parseInt(this.id.match(/\d+/g)[1])*40+115)+"deg)";
		$(this).children().css({
			"-webkit-transform": deg,
			"-moz-transform": deg,
			"transform": deg
		});
	});
});

$('#q4').append($('<br>'));
$('#q4').append($('<img id="q4_1" src="http://image.dek-d.com/27/0287/3755/119928609">'));
var q2changed = 0;
var q4changed = 0;
$('[id^=a4_]').parent().click(function(){
	if(q2changed == 0) {
		q2changed = 1;
		$('#q2_1').parent().append($('<img id="q2_2" src="http://image.dek-d.com/27/0287/3755/119924442">'));
		$('#q2_2')[0].style.position = 'absolute';
		$('#q2_2').offset($('#q2_1').offset());
	}
});
$(document).scroll(function(){
	if($(document).scrollTop() < $('#q2').offset().top && q2changed == 1 && q4changed == 0) {
		q4changed = 1;
		$('#q4_1').attr('src','http://image.dek-d.com/27/0287/3755/119928392');
	}
	if($(document).scrollTop() < $('#q2').offset().top && q2changed == 1 && q8answered == 1) {
		q2changed = 2;
		setTimeout(function(){
			for(var i=90;i>=0;i-=3) {
				$('#q2_2').animate({opacity : i/100.0}, 20);
				$('#q2_2').animate({opacity : i/150.0}, 20);
			}
		},1200);
		$('[id^=a3_]').each(function(){
			this.innerHTML = "<img src='http://s19.postimg.org/4b768pm1r/ghost.png'>";
			var deg = "rotate("+(parseInt(this.id.match(/\d+/g)[1])*40+115)+"deg)";
			$(this).children().css({
				"-webkit-transform": deg,
				"-moz-transform": deg,
				"transform": deg
			});
		});
		$('#q4_1').attr('src','http://image.dek-d.com/27/0287/3755/119928603');
		$('#q6_1').attr('src','http://image.dek-d.com/27/0287/3755/119930786');
	}
});

$('#q6').text($('#q6').text().replace("{{$num}}", $('#a1_1').parent().parent().attr('data-answer').match(/\d/)[0]));
$('#q6').append($('<br>'));
$('#q6').append($('<img id="q6_1" src="http://image.dek-d.com/27/0287/3755/119929270">'));

$('#q8').text($('#q8').text().replace("{{$question}}", "หากเล่นแล้วไม่ได้คะแนนเต็มแสดงว่าคุณยังเก็บรายละเอียดไม่ครบถ้วน.. ลองเล่นอีกครั้งเพื่อหาคำตอบดูสิ.. [ แล้วอย่าลืมแชร์ให้เพื่อนๆเล่นกันด้วยนะ :) ]"));
$('#a8_1').parent().parent()[0].style.display = "none";
$('#a8_2').text("รับทราบแล้ว!");
$('#a8_3').parent().parent()[0].style.display = "none";
$('#a8_4').parent().parent()[0].style.display = "none";

$('#a8_2').parent().click(function(){
	$('[id^=a1_]').each(function(){
		$($(this).parent().children()[0]).removeAttr('checked');
		$(this).parent().parent().removeClass("ansselected subborderbg subborderfont");
		$(this).text("วิญญาณ อายุ 13");
		q1answered = 0;
		q8answered = 1;
	});
	$('#a8_2').parent().unbind("click");
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
