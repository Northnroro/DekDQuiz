$('body').show();
$('.choice-item').hide();

var data1 = "นาย ก,74\nนาย ข,99\nนาย ค,5\nนางสาว ง,47\nด.ญ. ฉ,100";
var ans1 = "74\n99\n5\n47\n100";
setData(data1, $('[data-question-id=1] .title'), ans1);

var data2 = '<form id="piform" action="submit.php" method="POST">\n	<fieldset>\n		<legend>Personal</legend>\n		<input id="first" type="text"><br>\n		<input id="middlename" type="text"><br>\n		<input type="text" id="last"><br>\n	</fieldset>\n	<input type="number" id="age"><br>\n	<select id="gender">\n		<option value="M">Male</option>\n		<option value="F">Female</option>\n	</select>\n	<div id="responsiveInput" class="col-xs6 colmd-4>\n		<label>ID Number: </label><input id="id">\n		<label>House Type: </label><input id="type">\n	</div>\n</form>';
var ans2 = "71.5\n87\n99.25\n0\n100";
setData(data2, $('[data-question-id=2] .title'), ans2);

var data3 = "กมล,ชลวัล,71.5,หญิง,นางสาว\nวัฒนา,87,ชธาธิป,นาย,ชาย\n99.25,นโรโร่ว,ชาย,นาย,นอร์ธ\nSteve,Mr.,ชาย,0,West Gate\nคอร์ ไอ 7,A.I.,เวอร์ชั่น 17.0.01,,100";
var ans3 = "71.5\n87\n99.25\n0\n100";
setData(data3, $('[data-question-id=3] .title'), ans3);

var data4 = "กมล,ชลวัล,71.5,หญิง,นางสาว\nวัฒนา,87,ชธาธิป,นาย,ชาย\n99.25,นโรโร่ว,ชาย,นาย,นอร์ธ\nSteve,Mr.,ชาย,0,West Gate\nคอร์ ไอ 7,A.I.,เวอร์ชั่น 17.0.01,,100";
var ans4 = "71.5\n87\n99.25\n0\n100";
setData(data4, $('[data-question-id=4] .title'), ans4);

var data5 = "กมล,ชลวัล,71.5,หญิง,นางสาว\nวัฒนา,87,ชธาธิป,นาย,ชาย\n99.25,นโรโร่ว,ชาย,นาย,นอร์ธ\nSteve,Mr.,ชาย,0,West Gate\nคอร์ ไอ 7,A.I.,เวอร์ชั่น 17.0.01,,100";
var ans5 = "71.5\n87\n99.25\n0\n100";
setData(data5, $('[data-question-id=5] .title'), ans5);

initInputField($('[data-question-id] .choice-row').css({
	border: '1px #ffcfa0 solid',
    background: '#ffe8cd'
}), $('[data-question-id] .title'), [data1,data2,data3,data4,data5], [ans1,ans2,ans3,ans4,ans5]);

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
			hilightedData += data.substring(currPos, hilight[i].start).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
			   return '&#'+i.charCodeAt(0)+';';
			});
			hilightedResult += data.substring(currPos, hilight[i].start).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
			   return '&#'+i.charCodeAt(0)+';';
			});
			hilightedData += $('<div>').append($('<span>').css({
				background: '#ffd600',
			    'box-shadow': 'inset 0px 0px 0px 1px #ff9c00',
			    'border-radius': '3px'
			}).html(data.substring(hilight[i].start, hilight[i].start + hilight[i].length).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
			   return '&#'+i.charCodeAt(0)+';';
			}))).html();
			hilightedResult += $('<div>').append($('<span>').css({
				background: 'rgb(217, 245, 166)',
			    'box-shadow': 'rgb(139, 195, 33) 0px 0px 0px 1px',
			    'border-radius': '3px'
			}).html(data.substring(hilight[i].start, hilight[i].start + hilight[i].length).replace(new RegExp(findRegex), eval('\"' + replaceRegex + '\"')).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
			   return '&#'+i.charCodeAt(0)+';';
			}))).html();
			currPos = hilight[i].start + hilight[i].length;
		}
		hilightedData += data.substring(currPos).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
		   return '&#'+i.charCodeAt(0)+';';
		});
		hilightedResult += data.substring(currPos).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
		   return '&#'+i.charCodeAt(0)+';';
		});
	}else{
		hilightedData = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
		   return '&#'+i.charCodeAt(0)+';';
		});
		hilightedResult = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
		   return '&#'+i.charCodeAt(0)+';';
		});
	}
	// Attach code box with html text
	var answerCodeBox, resultCodeBox, dataCodeBox;
	$(afterElement).after(answerCodeBox = codeBoxTemplate.clone().html(answer).prepend($('<legend>Expected</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
	$(afterElement).after(resultCodeBox = codeBoxTemplate.clone().html(hilightedResult).prepend($('<legend>Output</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})).css({
		    margin: '0px -3px'
	}));
	$(afterElement).after(dataCodeBox = codeBoxTemplate.clone().html(hilightedData).prepend($('<legend>Input</legend>').css({
		padding: '0px 5px',
    	'margin-left': '5px'
	})));
	// Check answer'
	var isCorrect = resultCodeBox.clone().children('legend').remove().end().text() == answerCodeBox.clone().children('legend').remove().end().text();
	$(afterElement).parent().parent().find('.choice-item[title=' + (isCorrect ? 'ถูก' : 'ผิด') + '] input').click();
	if(isCorrect){
		$(afterElement).parent().parent().find('input').prop('disabled', true).css('box-shadow','0px 0px 10px 10px rgba(0,255,0,0.3) inset');
	}
}