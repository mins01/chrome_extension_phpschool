// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


/**
 * PHP스쿨 가위바위보
 */
let btn_phpschool_rps = document.getElementById('btn_phpschool_rps');
let btn_phpschool_rps_msgs = document.getElementById('btn_phpschool_rps_msgs');
btn_phpschool_rps.onclick = function(element) {
  var tmp_tm = setInterval(function(){
	var u_val = 'R';
	switch(Math.floor(Math.random()*3)){
		case 0:u_val = 'R'; break;
		case 1:u_val = 'S'; break;
		case 2:u_val = 'P'; break;
	}
  
  btn_phpschool_rps_msgs.value = '';
  $.ajax(
    {
      url:	"https://phpschool.com/community/rock_paper_scissors_ajax.php",
      type:	"post",
      data:	{
        user: u_val,
        val : "50"
      },
      dataType:"json",
      error:	function(resData){
        alert("오류가 발생했습니다. 관리자에게 문의하세요.");
      },
      success:function(resData) {
        console.log(resData);
        // resMsgs.push(JSON.stringify(resData))
        btn_phpschool_rps_msgs.value = JSON.stringify(resData)+'\n'+btn_phpschool_rps_msgs.value;
        if(resData.mode && resData.com_sel){
        }else{
          clearInterval(tmp_tm);
          console.log("END");
          btn_phpschool_rps_msgs.value = 'END'+'\n'+btn_phpschool_rps_msgs.value;
        }
      }
    });
  },1200);
}


