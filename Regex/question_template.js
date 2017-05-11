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