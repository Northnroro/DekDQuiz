$('body').show();

var data1 = "นาย ก,74\nนาย ข,99\nนาย ค,5\nนางสาว ง,47\nด.ญ. ฉ,100\n"
var ans1 = "นาย ก\nนาย ข\nนาย ค\nนางสาว ง\nด.ญ. ฉ\n"
setData(data1, $('[data-question-id=1] .title'), ans1);

function setData(data, afterEle, answer) {
	$(afterEle).parent().children(':gt(' + $(afterEle).index() + ')').remove();
	var codeBox = $('<fieldset>').css({
		'white-space': 'pre',
		display: 'inline-block',
		width: '33%',
		border: '3px ridge rgb(255, 178, 102)',
    	padding: '3px',
    	margin: '0px'
	});
	$(afterEle).after(codeBox.clone().html(answer).prepend($('<legend>Expected</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
	$(afterEle).after(codeBox.clone().html(data).prepend($('<legend>Output</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})).css({
		'border-width': '3px 0px'
	}));
	$(afterEle).after(codeBox.clone().html(data).prepend($('<legend>Input</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
}