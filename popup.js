// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var tmp_tm = null;
function initCode(){
  var str =[];
  str.push('window.tmp_tm = null');
  str.push('window.run_rps = '+run_rps.toString()+';');
  str.push('window.run_rpss = '+run_rpss.toString()+';');
  str.push('window.run_rpss();');
  return str.join("\n");
}
function run_rpss(){
  console.log('run_rpss')
  tmp_tm = setInterval(function(){
    run_rps();
  },1200);
}

function run_rps(){
  console.log('run_rps')
  var u_val = 'R';
  switch(Math.floor(Math.random()*3)){
    case 0:u_val = 'R'; break;
    case 1:u_val = 'S'; break;
    case 2:u_val = 'P'; break;
  }
  
  // btn_phpschool_rps_msgs.value = '';
  $.ajax(
    {
      url:	"/community/rock_paper_scissors_ajax.php",
      type:	"post",
      data:	{
        user: u_val,
        val : "50"
      },
      dataType:"json",
      error:	function(resData){
        alert("오류가 발생했습니다.");
        clearInterval(tmp_tm);
        console.log("END");
      },
      success:function(resData) {
        console.log(resData);
        if(resData.mode && resData.com_sel){
        }else{
          clearInterval(tmp_tm);
          alert('자동 가위바위보가 완료되었습니다.')
          console.log("END");
          window.open("/community/rock_paper_scissors.php",'_self');
        }
      }
    });
}

/**
 * PHP스쿨 가위바위보
 */
let btn_phpschool_rps = document.getElementById('btn_phpschool_rps');
let btn_phpschool_rps_msgs = document.getElementById('btn_phpschool_rps_msgs');

btn_phpschool_rps.onclick = function(element) {
  var code = initCode();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // console.log('run script ' + txt_script.value);
    chrome.tabs.executeScript(null, { file: "jquery-3.3.1.min.js" }, function() {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: code}
        );
    });
  });

}


