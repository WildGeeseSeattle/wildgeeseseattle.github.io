var docType = (document.compatMode && document.compatMode == "CSS1Compat");

function menu(size, orientation, x, y, offsetX, offsetY, bgColorOut, bgColorOver, fontFace, fontSize, 
	fontStyleOut, fontStyleOver, textColorOut, textColorOver, borderSize, borderColor, margin, showChar, 
	showOnClick, sepItems, isMainMenu, hasAnimations, animationType, hasShadow, sOffX, sOffY, shadowColor)
{
	for (var i=0; i<arguments.length; i++)
		if (typeof(arguments[i]) == "string")
			arguments[i] = arguments[i].toLowerCase();

	this.size = size;
	this.orientation = orientation;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.bgColorOut = bgColorOut;
	this.bgColorOver = bgColorOver;
	this.fontFace = fontFace;
	this.fontSize = fontSize;
	this.fontStyleOut = fontStyleOut;
	this.fontStyleOver = fontStyleOver;
	this.textColorOut = textColorOut;
	this.textColorOver = textColorOver;
	this.borderSize = borderSize;
	this.margin = margin;
	this.showChar = showChar;
	this.showOnClick = showOnClick;
	this.sepItems = sepItems;
	this.isMainMenu = isMainMenu;
	this.hasAnimations = hasAnimations;
	this.animationType = animationType;
	this.hasShadow = hasShadow;
	this.sOffX = sOffX;
	this.sOffY = sOffY;
	this.shadowColor = shadowColor;
	this.position = borderSize;
	this.addSeparator = separator;
	this.addItem = item;
	this.debug = debug;
	this.items = new Array();
	this.activeItems = new Array();
	this.animate = true;
	this.docMargin = docType ? margin : 0;

	this.main = document.createElement("div");
	document.body.appendChild(this.main);
	this.main.style.backgroundColor = borderColor;
	this.main.style.position = "absolute";
	this.main.style.left = x;
	this.main.style.top = y;
	this.main.style.zIndex = 1001 + menus.length;
	if (orientation == "horizontal")
	{
		this.main.style.height = size + this.docMargin;
		if (sepItems)
			this.main.style.width = borderSize;
		else
			this.main.style.width = borderSize*2;
	}
	else
	{
		if (sepItems)
			this.main.style.height = borderSize;
		else
			this.main.style.height = borderSize*2;
		this.main.style.width = size + this.docMargin;
	}
	if (isMainMenu)
		this.main.style.visibility = "visible";
	else
		this.main.style.visibility = "hidden";

	this.main.onmouseover = new Function("keepOpen();");
	this.main.onmouseout = new Function("hide();");

	if (this.hasShadow)
	{
		this.shadow = document.createElement("div");
		this.shadow.style.backgroundColor = shadowColor;
		this.shadow.style.position = "absolute";
		this.shadow.style.left = x + sOffX;
		this.shadow.style.top = y + sOffY;
		this.shadow.style.zIndex = 1000 + menus.length;
		this.shadow.style.height = this.main.style.height;
		this.shadow.style.width = this.main.style.width;
		if (isMainMenu)
			this.shadow.style.visibility = "visible";
		else
			this.shadow.style.visibility = "hidden";
		document.body.appendChild(this.shadow);
	}
}

function separator(sSize, sColor)
{
	if (!this.sepItems)
	{
		var temp = document.createElement("div");
		temp.style.backgroundColor = sColor;
		temp.style.paddingLeft = 0;
		temp.style.paddingTop = 0;
		temp.style.paddingRight = 0;
		temp.style.paddingBottom = 0;

		temp.style.position = "absolute";
		if (this.orientation == "horizontal")
		{
			temp.style.height = this.size - this.borderSize*2;
			temp.style.width = sSize;
			temp.style.left = this.position;
			temp.style.top = this.borderSize;
		}
		else
		{
			temp.style.height = sSize;
			temp.style.width = this.size - this.borderSize*2;
			temp.style.left = this.borderSize;
			temp.style.top = this.position;
		}

		var filler = document.createElement("img");
		filler.src = blank.src;
		filler.height = temp.style.pixelHeight;
		filler.width = temp.style.pixelWidth;
		temp.appendChild(filler);
		this.main.appendChild(temp);
		temp.style.visibility = "inherit";

		if (this.orientation == "horizontal")
			this.main.style.width = this.main.offsetWidth + sSize;
		else
			this.main.style.height = this.main.offsetHeight + sSize;
		this.position += sSize;

		if (this.hasShadow)
		{
			this.shadow.style.height = this.main.style.height;
			this.shadow.style.width = this.main.style.width;
		}
	}
}
 
function item(link, target, iSize, alignment, content, menuToShow)
{
//
//
	alignment = alignment.toLowerCase();
	var temp = document.createElement("div");
	this.main.appendChild(temp);
	if (this.orientation == "horizontal")
	{
		temp.style.height = this.size - this.borderSize*2;
		temp.style.width = iSize;
	}
	else
	{
		temp.style.height = iSize;
		temp.style.width = this.size - this.borderSize*2;
	}
	
	temp.style.backgroundColor = this.bgColorOut;
	temp.style.paddingLeft = this.margin;
	temp.style.paddingTop = this.margin;
	temp.style.paddingRight = 0;
	temp.style.paddingBottom = 0;
	temp.style.position = "absolute";
	if (this.orientation == "horizontal")
	{
		temp.style.left = this.position;
		temp.style.top = this.borderSize;
	}
	else
	{
		temp.style.left = this.borderSize;
		temp.style.top = this.position;
	}

	var fontTag = document.createElement("font");
	fontTag.face = this.fontFace;
	fontTag.color = this.textColorOut;
	fontTag.style.fontSize = this.fontSize + "pt";
	if (this.fontStyleOut.indexOf("bold") != -1)
		fontTag.style.fontWeight = "bold";
	else if (this.fontStyleOut.indexOf("italic") != -1)
		fontTag.style.fontStyle = "italic";
	else if (this.fontStyleOut.indexOf("underline") != -1)
		fontTag.style.textDecoration = "underline";

	var showMenuFunction;
	if (menuToShow != 0)
		showMenuFunction = "showMenu(" + menuToShow + ", " + (menus.length - 1) + ", " + (this.items.length) 
			+ ", " + this.offsetX + ", " + this.offsetY + ");";
	else
		showMenuFunction = "hideAfter(" + (menus.length-1) + ");";

	var tempSize = this.size - this.borderSize*2;
	if (this.orientation == "horizontal")
		tempSize = iSize;
	else
		tempSize = this.size - this.borderSize*2;

	if (!isNaN(this.showChar))
		this.showChar = String.fromCharCode(this.showChar);

	var showCharOver, showCharOut;
	var showCharOverParam = "none", showCharOutParam = "none";
	if (this.showChar.indexOf("rollover:") != -1)
	{
		var showCharArray = this.showChar.split(":");
		showCharOut = document.createElement("img");
		showCharOut.src = showCharArray[1];
		showCharOut.border = 0;
		showCharOverParam = showCharArray[2];
		showCharOutParam = showCharArray[1];
	}
	else
		showCharOut = document.createTextNode(this.showChar);
	var charFontTag = fontTag.cloneNode(true);
	if (menuToShow != 0)
		charFontTag.appendChild(showCharOut);
	else
	{
		showCharOverParam = "none";
		showCharOutParam = "none";
		charFontTag.innerHTML = "&nbsp;";
	}

	var contentFunctionOver = "", contentFunctionOut = "";
	var contentArray;
	var rollover;
	if (content.indexOf("rollover:") != -1)
	{
		contentArray = content.split(":");
		content = document.createElement("img");
		content.src = contentArray[1];
		content.border = 0;
		margin = 0;
		this.docMargin = 0;
		temp.style.paddingLeft = 0;
		temp.style.paddingTop = 0;
		temp.style.paddingRight = 0;
		temp.style.paddingBottom = 0;
		rollout = contentArray[1];
		rollover = contentArray[2];
	}

	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	var row = document.createElement("tr");
	var cell1 = document.createElement("td");
	var cell2 = cell1.cloneNode(false);

	table.border = 0;
	table.cellPadding = 0;
	table.cellSpacing = 0;
	table.width = tempSize - this.margin*2;
	temp.appendChild(table);

	table.appendChild(tbody);
	tbody.appendChild(row);

	if (content.src)
		fontTag.appendChild(content);
	else
		fontTag.innerHTML = content;
	cell1.align = alignment;
	if (content.src || this.showChar == "" || this.showChar == 0)
		cell1.width = "100%";
	else
		cell1.width = "80%";
	row.appendChild(cell1);
	cell1.appendChild(fontTag);

	if (!(content.src || this.showChar == "" || this.showChar == 0))
	{
		cell2.align = "right";
		cell2.width = "20%";
		row.appendChild(cell2);
		cell2.appendChild(charFontTag);
	}

	link = link.replace(/[']/g, "\\'");
	link = link.replace(/\"/g, "\\'");

	if (!content.src)
	{	
		contentFunctionOver = "html(this, '" + this.bgColorOver + "', '" + this.textColorOver + "', '" + 
			this.fontStyleOver + "', '" + showCharOverParam + "');";
		contentFunctionOut = "html(this, '" + this.bgColorOut + "', '" + this.textColorOut + "', '" + 
			this.fontStyleOut + "', '" + showCharOutParam + "');";
		if (link != "" && link != "#")
		{
			contentFunctionOver += "status='" + link + "';";
			contentFunctionOut += "status='';";
		}
	}
	else
	{
		contentFunctionOver = "roll(this, '" + rollover + "');";
		contentFunctionOut = "roll(this, '" + rollout + "');";
	}

	if (this.showOnClick && menuToShow != 0)
		temp.onmouseover = new Function("reset(" + (menus.length - 1) + ", " + menuToShow + ");" + 
			contentFunctionOver);
	else
		temp.onmouseover = new Function(showMenuFunction + contentFunctionOver);

	if (menuToShow != 0)
	{
		if (!content.src)
			this.activeItems[this.activeItems.length] = "html(menus[" + (menus.length-1) + "].items[" + 
				this.items.length + "], '" + this.bgColorOut + "', '" + this.textColorOut + "', '" + 
				this.fontStyleOut + "', '" + showCharOutParam + "');";
		else
			this.activeItems[this.activeItems.length] = "roll(menus[" + (menus.length-1) + "].items[" + 
				this.items.length + "], '" + rollout + "');";

		if (link != "" && link != "#")
			this.activeItems[this.activeItems.length-1] += "status='';";
	}
	else
		temp.onmouseout = new Function(contentFunctionOut);
	
	if (link != "" && link != "#")
	{
		if (target != "")
		{
			if (target.indexOf("NEWWIN") != -1)
				temp.onmouseup = new Function("window.open('" + link + "');");
			else
				temp.onmouseup = new Function("window.open('" + link + "', '" + target + "');");
		}
		else
			temp.onmouseup = new Function("location.href = '" + link + "';");
	}

	if (this.showOnClick && menuToShow != 0)
		temp.onmouseup = new Function(showMenuFunction + contentFunctionOver);

	temp.style.visibility = "inherit";
	
	if (this.sepItems)
	{
		if (this.orientation == "horizontal")
			this.main.style.width = this.main.offsetWidth + iSize + this.borderSize + this.docMargin;
		else
			this.main.style.height = this.main.offsetHeight + iSize + this.borderSize + this.docMargin;
		this.position += iSize + this.borderSize + this.docMargin;
	}
	else
	{
		if (this.orientation == "horizontal")
			this.main.style.width = this.main.offsetWidth + iSize + this.docMargin;
		else
			this.main.style.height = this.main.offsetHeight + iSize + this.docMargin;
		this.position += iSize + this.docMargin;
	}
	
	if (this.hasShadow)
	{
		this.shadow.style.height = this.main.style.height;
		this.shadow.style.width = this.main.style.width;
	}

	this.items[this.items.length] = temp;
}

function html(element, bgColor, textColor, fontStyle, showCharParam)
{
	element.style.backgroundColor = bgColor;
	if (element.onmouseup)
		element.style.cursor = "hand";
	else
		element.style.cursor = "default";

	var isBold = false, isItalic = false, isUnderline = false;
	if (fontStyle.indexOf("bold") != -1)
		isBold = true;
	if (fontStyle.indexOf("italic") != -1)
		isItalic = true;
	if (fontStyle.indexOf("underline") != -1)
		isUnderline = true;

	if (element.firstChild.tagName == "TABLE")
	{
		var mainElement = element.firstChild.firstChild.firstChild.firstChild.firstChild;
		mainElement.color = textColor;
		if (isBold)
			mainElement.style.fontWeight = "bold";
		else
			mainElement.style.fontWeight = "normal";
		if (isItalic)
			mainElement.style.fontStyle = "italic";
		else
			mainElement.style.fontStyle = "normal";
		if (isUnderline)
			mainElement.style.textDecoration = "underline";
		else
			mainElement.style.textDecoration = "none";

		var showChar = element.firstChild.firstChild.firstChild.lastChild.firstChild;
		if (showCharParam != "none")
			showChar.firstChild.src = showCharParam;
		else
		{
			showChar.color = textColor;
			if (isBold)
				showChar.style.fontWeight = "bold";
			else
				showChar.style.fontWeight = "normal";
			if (isItalic)
				showChar.style.fontStyle = "italic";
			else
				showChar.style.fontStyle = "normal";
			if (isUnderline)
				showChar.style.textDecoration = "underline";
			else
				showChar.style.textDecoration = "none";
		}
	}
	else
	{
		var singleElement = element.firstChild;
		singleElement.color = textColor;
		if (isBold)
			singleElement.style.fontWeight = "bold";
		else
			singleElement.style.fontWeight = "normal";
		if (isItalic)
			singleElement.style.fontStyle = "italic";
		else
			singleElement.style.fontStyle = "normal";
		if (isUnderline)
			singleElement.style.textDecoration = "underline";
		else
			singleElement.style.textDecoration = "none";
	}
}

function reset(num, sNum)
{
	var i;
	for (i=0; i<menus[num].activeItems.length; i++)
		eval(menus[num].activeItems[i]);
	for (i=num+1; i<menus.length; i++)
		if (i != sNum)
			menus[i].main.style.visibility = "hidden";
}

function roll(element, source)
{
	if (element.onmouseup)
		element.style.cursor = "hand";
	else
		element.style.cursor = "default";
	element.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.src = source;
}

function showMenu(num, pNum, iNum, offsetX, offsetY)
{
	var pMenu = menus[pNum];
	var pItem = pMenu.items[iNum];
	var cMenu = menus[num];

	if (cMenu.main.style.visibility != "visible")
	{
		hideAfter(pNum);

		var showX = pMenu.main.offsetLeft, showY = menus[pNum].main.offsetTop;
		if (pMenu.orientation == "horizontal")
		{
			if (pMenu.items.length > 0)
			{
				showY += pMenu.main.offsetHeight;
				showX += pItem.offsetLeft;
			}
		}
		else
		{
			if (pMenu.items.length > 0)
			{
				showX += pMenu.main.offsetWidth;
				showY += pItem.offsetTop;
			}
		}
	
		if (!docType && showX + cMenu.main.offsetWidth > document.body.clientWidth + 
			document.body.scrollLeft)
			showX -= (showX + cMenu.main.offsetWidth) - (document.body.clientWidth + 
				document.body.scrollLeft);
		if (!docType && showY + cMenu.main.offsetHeight > document.body.clientHeight + 
				document.body.scrollTop)
			showY -= (showY + cMenu.main.offsetHeight) - (document.body.clientHeight + 
				document.body.scrollTop);

		showX += offsetX;
		showY += offsetY;
	
		cMenu.main.style.left = showX;
		cMenu.main.style.top = showY;

		if (cMenu.hasShadow)
		{
			cMenu.shadow.style.left = showX + cMenu.sOffX;
			cMenu.shadow.style.top = showY + cMenu.sOffY;
		}

		if (pMenu.hasAnimations && cMenu.animate)
		{
			if (pMenu.animationType >= 24)
			{
				var animString;
				switch (pMenu.animationType)
				{
					case 24: animString = "Pixelate(duration=.5,maxSquare=25)"; break;
					case 25: animString = "Iris(duration=.5)"; break;
					case 26: animString = "Slide(duration=.5,slideStyle=SWAP,bands=0)"; break;
					default: animString = "Fade(duration=.5)"; break;
				}
				cMenu.main.style.filter = "progid:DXImageTransform.Microsoft." + animString;
				cMenu.shadow.style.filter = "progid:DXImageTransform.Microsoft." + animString;
			}
			else
			{
				cMenu.main.style.filter = "revealTrans(duration=.5,transition=" + menus[pNum].animationType 
					+ ")";
				if (cMenu.hasShadow) cMenu.shadow.style.filter = "revealTrans(duration=.5,transition=" + 
					menus[pNum].animationType + ")";
			}
			cMenu.main.filters[0].apply();
			if (cMenu.hasShadow) cMenu.shadow.filters[0].apply();
		}
		cMenu.main.style.visibility = "visible";
		if (cMenu.hasShadow) cMenu.shadow.style.visibility = "visible";
		if (cMenu.animate && pMenu.hasAnimations)
		{
			cMenu.main.filters[0].play();
			if (cMenu.hasShadow) cMenu.shadow.filters[0].play();
		}
		cMenu.animate = false;
	}
}

function hideAfter(num)
{
	var i, j;
	for (i=num+1; i<menus.length; i++)
	{
		if (!menus[i].isMainMenu)
		{
			menus[i].main.style.visibility = "hidden";
			if (menus[i].hasShadow) menus[i].shadow.style.visibility = "hidden";
			menus[i].animate = true;
		}
	}

	for (i=num; i<menus.length; i++)
		for (j=0; j<menus[i].activeItems.length; j++)
			eval(menus[i].activeItems[j]);
}

var wait = 500;
var hideTimer;

function keepOpen()
{
	if (hideTimer != null)
		clearTimeout(hideTimer);
}

function hide()
{
	hideTimer = setTimeout("hideAll()", wait);
}

function hideAll()
{
	var i;
	for (i=0; i<menus.length; i++)
	{
		if (!menus[i].isMainMenu)
		{
			menus[i].main.style.visibility = "hidden";
			if (menus[i].hasShadow) menus[i].shadow.style.visibility = "hidden";
			menus[i].animate = true;
		}
	}

	for (i=0; i<menus.length; i++)
		for (j=0; j<menus[i].activeItems.length; j++)
			eval(menus[i].activeItems[j]);
}

function debug()
{
	var win = window.open();
	win.document.open();
	win.document.write('<textarea cols=50 rows=25 wrap=virtual>' + this.main.innerHTML + '</textarea>');
	win.document.close();
	win.focus();
}

var menus = new Array();
