$('body').show();

var str1 = "นาย ก,74\nนาย ข,99\nนาย ค,5\nนางสาว ง,47\nด.ญ. ฉ,100\n"
setData(str1, $('[data-question-id=1] .title'));

function setData(string, afterEle) {
	$(afterEle).parent().children(':gt(' + $(afterEle).index() + ')').remove();
	var codeTemplate = $('<fieldset>').css({
		'white-space': 'pre',
		display: 'inline-block',
		width: '33%',
		border: '3px ridge rgb(255, 222, 113)',
    	padding: '3px',
    	margin: '0px'
	}).html(string);
	$(afterEle).after(codeTemplate.clone().prepend('<legend>Input</legend>'));
	$(afterEle).after(codeTemplate.clone().prepend('<legend>Output</legend>'));
	$(afterEle).after(codeTemplate.clone().prepend('<legend>Expected</legend>'));
}