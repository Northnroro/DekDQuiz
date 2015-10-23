for(var i=1;i<=32;i++) {
	$('#q'+i).append($('<br>'));
	var eee = $('<div style="width:175px; height:220px; clear:both;></div>');
	$('#q'+i).append(eee);
	var ele = $('<img src="http://img-9gag-fun.9cache.com/photo/aOmj2AM_700b.jpg">');
	$(eee).append(ele);
	var topp = 161+Math.floor((i-1)/4)*220+Math.floor((i-1)/8)*22+Math.floor((i-1)/24)*8;
	var left = ((i-1)%4)*175;
	ele.css({
		"position": "absolute",
		"clip": "rect("+topp+"px,"+(left+175)+"px,"+(topp+220)+"px,"+left+"px)",
		"margin": "-"+topp+"px 0px 0px -"+left+"px"
	});
	//"top": $('#q'+i).offset().top+20+"px",
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