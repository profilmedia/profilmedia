window.addEventListener?window.addEventListener("load",so_init,false):window.attachEvent("onload",so_init);

var d=document, imgs = new Array(), zInterval = null, current=0, myCurrent=0, pause=false;
var fadeTimer = null;
var adFunctions = new Array();

function so_init() {
	if(!d.getElementById || !d.createElement)return;

	css = d.createElement("link");
	css.setAttribute("href","xfade2.css");
	css.setAttribute("rel","stylesheet");
	css.setAttribute("type","text/css");
	d.getElementsByTagName("head")[0].appendChild(css);

	imgs = d.getElementById("imageContainer").getElementsByTagName("div");

	for(i=1;i<imgs.length;i++)
	{
		imgs[i].xOpacity = 0;
	}
	imgs[0].style.display = "block";
	imgs[0].style.visibility = "visible";
	imgs[0].xOpacity = .99;
	
	fadeTimer = setTimeout(so_xfade,2500);	
}


var xlocked = false;
var nextTimer = null;
function so_specface(ix)
{
	return;
	if (current == ix)
		return;
	
	if (xlocked)
	{
		clearTimeout(nextTimer);
		nextTimer = setTimeout("so_specface("+ix+");", 500);
		return;
	}
	
	xlocked = true;
	setTimeout("xunlock();", 1100);
	clearTimeout(fadeTimer);
	
	myCurrent = ix-1;
	so_xfade();
	
	//fadeTimer = setTimeout(so_xfade,3400);
}

function xunlock()
{
	xlocked = false;
}

function so_xfade() {
	cOpacity = imgs[current].xOpacity;
	nIndex = imgs[myCurrent + 1]?myCurrent + 1:0;

	nOpacity = imgs[nIndex].xOpacity;
	
	cOpacity-=.05; 
	nOpacity+=.05;
	
	imgs[nIndex].style.display = "block";
	imgs[nIndex].style.visibility = "visible";
	imgs[current].xOpacity = cOpacity;
	imgs[nIndex].xOpacity = nOpacity;
	
	setOpacity(imgs[current]); 
	setOpacity(imgs[nIndex]);
	
	
	if(cOpacity<=0) {
		
		xlocked = false;
		imgs[current].style.display = "none";
		current = nIndex;
		myCurrent = nIndex;
		fadeTimer = setTimeout(so_xfade,2500);
	} else {
		fadeTimer = setTimeout(so_xfade,50);
	}
	
	function setOpacity(obj)
	{
		if(obj.xOpacity>.99) {
			obj.xOpacity = .99;
			return;
		}
		obj.style.opacity = obj.xOpacity;
		obj.style.MozOpacity = obj.xOpacity;
		obj.style.filter = "alpha(opacity=" + (obj.xOpacity*100) + ")";
		xlocked = true;
	}
}