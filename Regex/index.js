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
	}).attr('placeholder', '(max. 50 characters)').attr('maxlength', 50));
	for(var i in dataStrings){
		var findDiv = inputFieldTemplate.clone();
		var replaceDiv = inputFieldTemplate.clone();
		$(divElements[i]).append(findDiv.prepend($('<label>').text("Find RegExp: ").css({width: '17%', display: 'inline-block'})).keyup(getChangeFunction(i,$(findDiv),$(replaceDiv),bindQuestionTitles,dataStrings,answerStrings)));
		$(divElements[i]).append(replaceDiv.prepend($('<label>').text("Replace With: ").css({width: '17%', display: 'inline-block'})).keyup(getChangeFunction(i,$(findDiv),$(replaceDiv),bindQuestionTitles,dataStrings,answerStrings)));
	}
}

function getChangeFunction(i,find,replace,bindQuestionTitles,dataStrings,answerStrings){
	return function(){
		var result, string = dataStrings[i], matches = [], currPos = 0;;
		while((result = string.match(new RegExp(find.children('input').val()))) && string.length > 0){
			string = string.substring(result.index + Math.max(1, result[0].length));
			matches.push({start: currPos + result.index, length: result[0].length});
			currPos += result.index + Math.max(1, result[0].length);
		}
		setData(dataStrings[i], bindQuestionTitles[i], answerStrings[i], matches, find.children('input').val(), replace.children('input').val());
	};
}

function setData(data, afterElement, answer, hilight, findRegex, replaceRegex) {
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
	// Input + Hilight
	var hilightedData = "", hilightedResult = "", currPos = 0;
	if(hilight){ // For Data -> Hilight Only | For Ans -> Hilight and Replace
		for(var i in hilight){
			hilightedData += data.substring(currPos, hilight[i].start);
			hilightedResult += data.substring(currPos, hilight[i].start);
			hilightedData += $('<div>').append($('<span>').css({
				background: '#ffd600',
			    'box-shadow': 'inset 0px 0px 0px 1px #ff9c00',
			    'border-radius': '3px'
			}).text(data.substring(hilight[i].start, hilight[i].start + hilight[i].length))).html();
			hilightedResult += $('<div>').append($('<span>').css({
				background: 'rgb(217, 245, 166)',
			    'box-shadow': 'rgb(139, 195, 33) 0px 0px 0px 1px',
			    'border-radius': '3px'
			}).text(data.substring(hilight[i].start, hilight[i].start + hilight[i].length).replace(new RegExp(findRegex), eval('\"' + replaceRegex + '\"')))).html();
			currPos = hilight[i].start + hilight[i].length;
		}
		hilightedData += data.substring(currPos);
		hilightedResult += data.substring(currPos);
	}else{
		hilightedData = data;
		hilightedResult = data;
	}
	// Attach code box with html text
	$(afterElement).after(codeBoxTemplate.clone().html(answer).prepend($('<legend>Expected</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
	$(afterElement).after(codeBoxTemplate.clone().html(hilightedResult).prepend($('<legend>Output</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})).css({
		    margin: '0px -3px'
	}));
	$(afterElement).after(codeBoxTemplate.clone().html(hilightedData).prepend($('<legend>Input</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
}