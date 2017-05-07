$('body').show();
$('.choice-item').hide();

var data1 = "นาย ก,74\nนาย ข,99\nนาย ค,5\nนางสาว ง,47\nด.ญ. ฉ,100\n"
var ans1 = "74\n99\n5\n47\n100\n"
setData(data1, $('[data-question-id=1] .title'), ans1);

initInputField($('[data-question-id] .choice-row').css({
	border: '1px #ffcfa0 solid',
    background: '#ffe8cd'
}), $('[data-question-id] .title'), [data1], [ans1]);

function initInputField(divElements, bindQuestionTitles, dataStrings, answerStrings){
	var inputFieldTemplate = $('<div>').css({
		padding: '3px 5px'
	}).append($('<input>').css({
		width: '82%',
		'font-family': 'Consolas'
	}).attr('placeholder', '(max. 50 characters)'));
	for(var i in dataStrings){
		var findDiv = inputFieldTemplate.clone();
		$(divElements[i]).append(findDiv.prepend($('<label>').text("Find RegExp: ").css({width: '17%', display: 'inline-block'})).keyup((function(i,input){
			return function(){
				var result, string = dataStrings[i], matches = [], currPos = 0;;
				while((result = string.match(new RegExp(input.children('input').val()))) && string.length > 0){
					string = string.substring(result.index + 1);
					matches.push({start: currPos + result.index, length: result[0].length});
					currPos += result.index + 1;
					console.log(matches);
				}
				setData(dataStrings[i], bindQuestionTitles[i], answerStrings[i], matches);
			};
		})(i,$(findDiv))));
		var replaceDiv = inputFieldTemplate.clone();
		$(divElements[i]).append(replaceDiv.prepend($('<label>').text("Replace With: ").css({width: '17%', display: 'inline-block'})).keyup((function(i,input){
			return function(){
				console.log(answerStrings[i]);
			};
		})(i,$(replaceDiv))));
	}
}

function setData(data, afterElement, answer, hilight) {
	$(afterElement).parent().children(':gt(' + $(afterElement).index() + ')').remove();
	var codeBoxTemplate = $('<fieldset>').css({
		'white-space': 'pre',
		display: 'inline-block',
		width: '33%',
		border: '3px ridge rgb(255, 178, 102)',
    	padding: '5px',
    	margin: '0px',
    	'margin-bottom': '-10px',
    	background: '#fff7ef'
	});
	$(afterElement).after(codeBoxTemplate.clone().html(answer).prepend($('<legend>Expected</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
	$(afterElement).after(codeBoxTemplate.clone().html(data).prepend($('<legend>Output</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})).css({
		'border-width': '3px 0px'
	}));
	// Input + Hilight
	var hilightedData = "", currPos = 0;
	if(hilight){
		for(var i in hilight){
			hilightedData += data.substring(currPos, hilight[i].start);
			hilightedData += $('<div>').append($('<span>').css({background: 'yellow'}).text(data.substring(hilight[i].start, hilight[i].start + hilight[i].length))).html();
			currPos = hilight[i].start + hilight[i].length;
		}
		hilightedData += data.substring(currPos);
	}else{
		hilightedData = data;
	}
	$(afterElement).after(codeBoxTemplate.clone().html(hilightedData).prepend($('<legend>Input</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
}