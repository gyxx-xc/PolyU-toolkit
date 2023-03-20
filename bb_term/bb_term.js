// ==UserScript==
// @name     Unnamed Script 640157
// @version  1
// @grant    GM.addStyle
// @match    https://learn.polyu.edu.hk/ultra/*
// ==/UserScript==


var href = window.location.href;

var a = '#active-term-name::after::after{content: "asdasdasd";}';

document.getElementsByTagName("body")[0].onload = function(){
  if(true){console.log(100000000);}
  M = 1;
  if(href == "https://learn.polyu.edu.hk/ultra/course") changeTerm();
  window.setInterval(function(){ if( document.getElementsByClassName("base-navigation-button")[3].onclick == null)
    														   document.getElementsByClassName("base-navigation-button")[3].onclick = function(){changeTerm();} ;
                                 }, 200);

}

function isReady(myEvent){
	try{
    document.getElementsByClassName("select-wrapper")[0].getElementsByTagName("button")[0];
    window.dispatchEvent(myEvent);
  }catch(e){
		return;
	}
}

function getList(){
  var output = new Array(0);
  for(var i = 0;; i ++){
    if(document.getElementsByClassName("js-filter-id-"+i.toString())[0] === undefined) break;
    output.unshift( document.getElementsByClassName("js-filter-id-"+i.toString() )[0].getElementsByTagName("span")[0] );
    
  }
  return output;
}

function selectUpd(){
  var ind = document.getElementById("Term").selectedIndex
  document.cookie = "name="+ind.toString();
}

function change(){
  document.getElementsByClassName("select-wrapper")[0].getElementsByTagName("button")[0].click();
  var lis = getList();
  if(document.getElementById("Term") == null) S(lis);
  lis[ document.getElementById("Term").selectedIndex ].click();
}

function S(lis){
  var cs = 'width: 300px;margin:0px;'
  var selet = '<p style = "margin-bottom:0px;margin-left:auto;margin-right:0px;">defult Term:</p><select onChange="console.log(1);" style="'+cs+'" id="Term">';
  for (x in lis ){
    selet += "<option value="+lis[x].innerHTML+">"+lis[x].innerHTML+"</option>";
  }
  selet += '</select>'
  document.getElementById("main-heading").setAttribute("style", "flex:none;")
  document.getElementById("main-heading").insertAdjacentHTML("afterend", selet);
  document.getElementById("Term").onchange = function(){selectUpd();};
  document.getElementById("Term").selectedIndex = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1"), 10);
}

function changeTerm(){
  var myEvent = new Event("readyLoad");
	var timer = window.setInterval( function(){isReady(myEvent);}, 200);
  window.addEventListener("readyLoad", function(){ clearInterval(timer); change(); } );
}
