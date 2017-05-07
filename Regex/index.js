$('body').show();

var str1 = "นาย ก,74\nนาย ข,99\nนาย ค,5\nนางสาว ง,47\nด.ญ. ฉ,100\n"
setData(str1, $('[data-question-id=1] .title'));

function setData(string, afterEle) {
	$(afterEle).parent().children(':not(:first-child)').remove();
	$(afterEle).after($('<div>').css('white-space', 'pre').html(string));
}