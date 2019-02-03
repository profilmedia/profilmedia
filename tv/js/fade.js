window.addEventListener?window.addEventListener("load",so_init,false):window.attachEvent("onload",so_init);

var d=document, zInterval = null, pause=false;
var fadeTimer = null;
var adFunctions = new Array();
var ctrls = new Array();

function so_init() {
	if(!d.getElementById || !d.createElement) return;

	//imgs = d.getElementById("imageContainer").getElementsByTagName("div");

	stores = d.getElementsByClassName("imageContainer");

	for(i=0; i < stores.length; i++) {
		var ctrl = {};

		var imgs = stores[i].getElementsByClassName("store-img");

		for(j=1; j < imgs.length; j++) {
			imgs[j].xOpacity = 0;
		}
		imgs[0].style.display = "block";
		imgs[0].style.visibility = "visible";
		imgs[0].xOpacity = .99;

		ctrl.index = i;
		ctrl.imgs = imgs;
		ctrl.current = 0;
		ctrl.myCurrent = 0;

		ctrls.push(ctrl);
		setTimeout("so_xfade("+i+")", 1500);
	}
}

function so_xfade(xi) {
	var ctrl = ctrls[xi];
	var current = ctrl.current;
	var myCurrent = ctrl.myCurrent;

	cOpacity = ctrl.imgs[current].xOpacity;
	nIndex = ctrl.imgs[myCurrent + 1] ? myCurrent + 1 : 0;

	nOpacity = ctrl.imgs[nIndex].xOpacity;
	
	cOpacity -= .05; 
	nOpacity += .05;
	
	ctrl.imgs[nIndex].style.display = "block";
	ctrl.imgs[nIndex].style.visibility = "visible";
	ctrl.imgs[current].xOpacity = cOpacity;
	ctrl.imgs[nIndex].xOpacity = nOpacity;
	
	setOpacity(ctrl.imgs[current]); 
	setOpacity(ctrl.imgs[nIndex]);	
	
	if(cOpacity <= 0) {	
		ctrls[xi].imgs[current].style.display = "none";
		ctrls[xi].current = nIndex;
		ctrls[xi].myCurrent = nIndex;
		setTimeout("so_xfade("+xi+")", 2000);
	} else {
		setTimeout("so_xfade("+xi+")", 50);
	}
}
	
function setOpacity(obj) {
	if(obj.xOpacity>.99) {
		obj.xOpacity = .99;
		return;
	}
	obj.style.opacity = obj.xOpacity;
	obj.style.MozOpacity = obj.xOpacity;
	obj.style.filter = "alpha(opacity=" + (obj.xOpacity * 100) + ")";
}

function mmm() {
	location.href = 'mai' + '' + 'lto:profilm' + 'edia@' + 'telia.c' + 'om';
}

$(document).ready(function(){
	if(window.location.hash != "") {
		$('a[href="' + window.location.hash + '"]').click();
	}

	$('.nav-tabs a').on('click', function (e) {
		window.location.hash = e.target.hash;
	})

	$(window).on('hashchange', function(){
	    $('a[href="' + window.location.hash + '"]').click();
	});
});