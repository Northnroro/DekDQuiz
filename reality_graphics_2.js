for(var i=1;i<=32;i++) {
	$('#q'+i).append($('<br>'));
	var ele = $('<img src="http://img-9gag-fun.9cache.com/photo/aOmj2AM_700b.jpg">');
	$('#q'+i).append(ele);
	var top = 161+Math.floor((i-1)/4)*217+Math.floor((i-1)/8)*22+Math.floor((i-1)/24)*8;
	var left = ((i-1)%4)*175;
	ele.css({
		"position": "absolute",
		"clip": "rect("+top+"px,"+left+"px,"+(1996-top+217)+"px,"+(700-left+175)+"px)",
		"margin": "-"+top+"px 0px 0px -"+left+"px"
	});
}

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