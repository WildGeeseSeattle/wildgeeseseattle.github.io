window.onresize = new Function("location.reload();");
var docType = false;

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
	this.fontStyleOver = fontStyleOver;
	this.fontStyleOut = fontStyleOut;
	this.textColorOut = textColorOut;
	this.textColorOver = textColorOver;
	this.borderSize = borderSize;
	this.borderColor = borderColor;
	this.margin = margin;
	this.showChar = showChar;
	this.showOnClick = showOnClick;
	this.sepItems = sepItems;
	this.isMainMenu = isMainMenu;
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

	if (orientation == "horizontal")
	{
		if (sepItems)
			this.main = new Layer(borderSize, window);
		else
			this.main = new Layer(borderSize*2, window);
	}
	else
		this.main = new Layer(size, window);
	
	this.main.bgColor = borderColor;
	if (orientation == "horizontal")
		this.main.clip.height = size;
	else
	{
		if (sepItems)
			this.main.clip.height = borderSize;
		else
			this.main.clip.height = borderSize*2;
	}
	this.main.pageX = x;
	this.main.pageY = y;
	this.main.zIndex = 1001 + menus.length;

	this.main.onmouseover = new Function("keepOpen();");
	this.main.onmouseout = new Function("hide();");

	if (isMainMenu)
		this.main.hidden = false;

	if (this.hasShadow)
	{
		this.shadow = new Layer(this.main.clip.width, window);
		this.shadow.bgColor = shadowColor;
		this.shadow.pageX = x + sOffX;
		this.shadow.pageY = y + sOffY;
		this.shadow.zIndex = 1000 + menus.length;
		this.shadow.clip.height = this.main.clip.height;
		if (isMainMenu)
			this.shadow.hidden = false;
	}
}

function separator(sSize, sColor)
{
	if (!this.sepItems)
	{
		if (this.orientation == "horizontal")
			var temp = new Layer(sSize, this.main);
		else
			var temp = new Layer(this.size - this.borderSize*2, this.main);
		temp.bgColor = sColor;

		if (this.orientation == "horizontal")
		{
			temp.height = this.size - this.borderSize*2;
			temp.width = sSize;
			temp.left = this.position;
			temp.top = this.borderSize;
			temp.document.open();
			temp.document.write('<img src="' + blank.src + '" height="' + temp.height + '" width="' + sSize + 
				'">');
			temp.document.close();
		}
		else
		{
			temp.height = sSize;
			temp.width = this.size - this.borderSize*2;
			temp.left = this.borderSize;
			temp.top = this.position;
			temp.document.open();
			temp.document.write('<img src="' + blank.src + '" height="' + sSize + '" width="' + temp.width + 
				'">');
			temp.document.close();
		}

		temp.hidden = false;
		temp.visibility = "inherit";

		if (this.orientation == "horizontal")
			this.main.clip.width += sSize;
		else
			this.main.clip.height += sSize;
		this.position += sSize;

		if (this.hasShadow)
		{
			this.shadow.clip.height = this.main.clip.height;
			this.shadow.clip.width = this.main.clip.width;
		}
	}
}
 
function item(link, target, iSize, alignment, content, menuToShow)
{
	alignment = alignment.toLowerCase();
	var temp;
	if (this.orientation == "horizontal")
	{
		temp = new Layer(iSize, this.main);
		temp.clip.height = this.size - this.borderSize*2;
	}
	else
	{
		temp = new Layer(this.size - this.borderSize*2, this.main);
		temp.clip.height = iSize;
	}
	
	temp.bgColor = this.bgColorOut;
	if (this.orientation == "horizontal")
	{
		temp.x = this.position;
		temp.y = this.borderSize;
	}
	else
	{
		temp.x = this.borderSize;
		temp.y = this.position;
	}

	var fontStyleBeg = "", fontStyleEnd = "";
	if (this.fontStyleOut.indexOf("bold") != -1)
	{
		fontStyleBeg += "<b>";
		fontStyleEnd += "</b>";
	}
	if (this.fontStyleOut.indexOf("italic") != -1)
	{
		fontStyleBeg += "<i>";
		fontStyleEnd = "</i>" + fontStyleEnd;
	}
	if (this.fontStyleOut.indexOf("underline") != -1)
	{
		fontStyleBeg += "<u>";
		fontStyleEnd = "</u>" + fontStyleEnd;
	}

	var fontStyleOverBeg = "", fontStyleOverEnd = "";
	if (this.fontStyleOver.indexOf("bold") != -1)
	{
		fontStyleOverBeg += "<b>";
		fontStyleOverEnd += "</b>";
	}
	if (this.fontStyleOver.indexOf("italic") != -1)
	{
		fontStyleOverBeg += "<i>";
		fontStyleOverEnd = "</i>" + fontStyleEnd;
	}
	if (this.fontStyleOver.indexOf("underline") != -1)
	{
		fontStyleOverBeg += "<u>";
		fontStyleOverEnd = "</u>" + fontStyleEnd;
	}

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

	var tWidth = "";
	if (this.showChar == "" || this.showChar == 0)
		tWidth = "100%";
	else
	{
		tWidth = "80%";
		if (!isNaN(this.showChar))
			this.showChar = String.fromCharCode(this.showChar);
	}

	var showCharOver = "", showCharOut = "";
	if (menuToShow != 0)
	{
		if (this.showChar.indexOf("rollover:") != -1)
		{
			var showCharArray = this.showChar.split(":");
			showCharOver = '<img src="' + showCharArray[2] + '" border="0">';
			showCharOut = '<img src="' + showCharArray[1] + '" border="0">';
		}
		else
		{
			showCharOver = this.showChar;
			showCharOut = this.showChar;
		}
	}

	var contentFunctionOver = "", contentFunctionOut = "";
	var contentArray;
	var tempMargin = this.margin;
	if (content.indexOf("rollover:") != -1)
	{
		contentArray = content.split(":");
		content = "";
		if (link != "" && link != "#")
			content += '<a href="' + link + '">';
		content += '<img src="' + contentArray[1] + '" border="0">';
		if (link != "" && link != "#")
			content += '</a>';
		this.margin = 0;
		contentFunctionOver = "menus[" + (menus.length - 1) + "].main.document.layers[" + 
			(this.items.length) + "].document.images[0].src = '" + contentArray[2] + "';";
		contentFunctionOut = "menus[" + (menus.length - 1) + "].main.document.layers[" + 
			(this.items.length) + "].document.images[0].src = '" + contentArray[1] + "';";
		contentFunctionOver += "window.status='" + link + "';";
	}

	temp.document.open();
	temp.document.write('<body marginheight="' + this.margin + '" marginwidth="' + this.margin + '">');
	temp.document.write('<div align="' + alignment + '">');
	temp.document.write('<table border="0" cellpadding="0" cellspacing="0" width="' + (tempSize - 
		this.margin*2) + '">');
	if (contentFunctionOver == "")
	{
		temp.document.write('<tr><td align="' + alignment + '" width="' + tWidth + '"><font face="' + this.fontFace + 
			'" point-size="' + this.fontSize + '" color="' + this.textColorOut + '">' + fontStyleBeg + content 
			+ fontStyleEnd + '</font></td>');
		if (tWidth == "80%")
			temp.document.write('<td align="right" width="20%"><font face="' + this.fontFace + '" point-size="' + 
				this.fontSize + '" color="' + this.textColorOut + '">' + fontStyleBeg + showCharOut + fontStyleEnd 
				+ '</font></td></tr>');
	}
	else
		temp.document.write('<tr><td align="' + alignment + '">' + content + '</td></tr>');
	temp.document.write('</table>');
	temp.document.write('</div>');
	temp.document.write('</body>');
	temp.document.close();

	content = content.replace(/[']/g, "\\'");
	link = link.replace(/[']/g, "\\'");
	link = link.replace(/\"/g, "\\'");

	var outContent = '', overContent = '';

	outContent += '<body marginheight="' + this.margin + '" marginwidth="' + this.margin + '">';
	outContent += '<div align="' + alignment + '">';
	outContent += '<table border="0" cellpadding="0" cellspacing="0" width="' + (tempSize - 
		this.margin*2) + '">';
	if (contentFunctionOver == "")
	{
		outContent += '<tr><td align="' + alignment + '" width="' + tWidth + '"><font face="' + this.fontFace + 
			'" point-size="' + this.fontSize + '" color="' + this.textColorOut + '">' + fontStyleBeg + content 
			+ fontStyleEnd + '</font></td>';
		if (tWidth == "80%")
			outContent += '<td align="right" width="20%"><font face="' + this.fontFace + '" point-size="' + 
				this.fontSize + '" color="' + this.textColorOut + '">' + fontStyleBeg + showCharOut + fontStyleEnd 
				+ '</font></td></tr>';
	}
	else
		outContent += '<tr><td align="' + alignment + '">' + content + '</td></tr>';
	outContent += '</table>';
	outContent += '</div>';
	outContent += '</body>';

	overContent += '<body marginheight="' + this.margin + '" marginwidth="' + this.margin + '">';
	overContent += '<div align="' + alignment + '">';
	overContent += '<table border="0" cellpadding="0" cellspacing="0" width="' + (tempSize - 
		this.margin*2) + '">';
	if (contentFunctionOver == "")
	{
		overContent += '<tr><td align="' + alignment + '" width="' + tWidth + '"><font face="' + this.fontFace + 
			'" point-size="' + this.fontSize + '" color="' + this.textColorOver + '">' + fontStyleOverBeg + 
			content + fontStyleOverEnd + '</font></td>';
		if (tWidth == "80%")
			overContent += '<td align="right" width="20%"><font face="' + this.fontFace + '" point-size="' + 
				this.fontSize + '" color="' + this.textColorOver + '">' + fontStyleOverBeg + showCharOver + 
				fontStyleOverEnd + '</font></td></tr>';
	}
	else
		overContent += '<tr><td align="' + alignment + '">' + content + '</td></tr>';
	overContent += '</table>';
	overContent += '</div>';
	overContent += '<layer height="' + temp.clip.height + '" width="' + temp.clip.width + '" left="0"' + 
		' top="0">';
	if (link.toLowerCase().indexOf("javascript:") != -1)
		overContent += '<a href="javascript:void(0)" onclick="' + link.substr(link.indexOf("javascript:") 
			+ 11) + '">';
	else if (link != "" && link != "#")
	{
		if (target.indexOf("NEWWIN") != -1)
			overContent += '<a href="' + link + '" target="_blank">';
		else
			overContent += '<a href="' + link + '" target="' + target + '">';
	}
	overContent += '<img src="' + buildDir + 'blank.gif" height="' + temp.clip.height + '" width="' + 
		temp.clip.width + '" border="0">';
	overContent += '</layer>';
	if (link != "" && link != "#")
		overContent += '</a>';
	overContent += '</body>';

	if (contentFunctionOver == "")
	{
		contentFunctionOver = "colorText(this, '" + overContent + "');";
		contentFunctionOut = "colorText(this, '" + outContent + "');";
	}

	if (this.showOnClick && menuToShow != 0)
		temp.onmouseover = new Function("reset(" + (menus.length - 1) + ", " + menuToShow + ");" + 
			"colorBg(this, '" + this.bgColorOver + "');" + contentFunctionOver);
	else
		temp.onmouseover = new Function(showMenuFunction + "colorBg(this, '" + this.bgColorOver + "');" + 
			contentFunctionOver);

	if (menuToShow != 0)
	{
		if (contentFunctionOver.indexOf("colorText") != -1)
			this.activeItems[this.activeItems.length] = this.items.length + "|" + outContent;
		else
			this.activeItems[this.activeItems.length] = this.items.length + "|rollover:" + contentArray[1];
	}
	else
		temp.onmouseout = new Function("colorBg(this, '" + this.bgColorOut + "');" + contentFunctionOut);

	temp.visibility = "inherit";
	this.margin = tempMargin;
	
	if (this.sepItems)
	{
		if (this.orientation == "horizontal")
			this.main.clip.width += iSize + this.borderSize;
		else
			this.main.clip.height += iSize + this.borderSize;
		this.position += iSize + this.borderSize;
	}
	else
	{
		if (this.orientation == "horizontal")
			this.main.clip.width += iSize;
		else
			this.main.clip.height += iSize;
		this.position += iSize;
	}

	if (this.hasShadow)
	{
		this.shadow.clip.height = this.main.clip.height;
		this.shadow.clip.width = this.main.clip.width;
	}

	this.items[this.items.length] = temp;
}

function colorBg(element, color)
{
	element.bgColor = color;
}

function colorText(element, html)
{
	element.document.open();
	element.document.write(html);
	element.document.close();
}

function reset(num, sNum)
{
	var i;
	for (i=0; i<menus[num].activeItems.length; i++)
	{
		var tempArray = menus[num].activeItems[i].split("|");
		colorBg(menus[num].items[tempArray[0]], menus[num].bgColorOut);
		if (tempArray[1].indexOf("rollover:") != -1)
			menus[num].items[tempArray[0]].document.images[0].src = tempArray[1].split(":")[1];
		else
			colorText(menus[num].items[tempArray[0]], tempArray[1]);
	}
	for (i=num+1; i<menus.length; i++)
		if (i != sNum)
			menus[i].main.hidden = true;
}

function showMenu(num, pNum, iNum, offsetX, offsetY)
{
	if (menus[num].main.hidden)
	{
		hideAfter(pNum);

		var showX = menus[pNum].main.pageX, showY = menus[pNum].main.pageY;
		if (menus[pNum].orientation == "horizontal")
		{
			if (menus[pNum].items.length > 0)
			{
				showY += menus[pNum].main.clip.height;
				showX += menus[pNum].items[iNum].x;
			}
		}
		else
		{
			if (menus[pNum].items.length > 0)
			{
				showX += menus[pNum].main.clip.width;
				showY += menus[pNum].items[iNum].y;
			}
		}
	
		if (showX + menus[num].main.clip.width > window.innerWidth + window.pageXOffset)
			showX -= (showX + menus[num].main.clip.width) - (window.innerWidth + window.pageXOffset);
		if (showY + menus[num].main.clip.height > window.innerHeight + window.pageYOffset)
			showY -= (showY + menus[num].main.clip.height) - (window.innerHeight + window.pageYOffset);

		showX += offsetX;
		showY += offsetY;

		if (menus[num].hasShadow)
		{
			menus[num].shadow.pageX = showX + menus[num].sOffX;
			menus[num].shadow.pageY = showY + menus[num].sOffY;
		}
	
		menus[num].main.pageX = showX;
		menus[num].main.pageY = showY;
		menus[num].main.hidden = false;
		if (menus[num].hasShadow) menus[num].shadow.hidden = false;
	}
}

function hideAfter(num)
{
	var i;
	for (i=num+1; i<menus.length; i++)
	{
		if (!menus[i].isMainMenu)
		{
			menus[i].main.hidden = true;
			if (menus[i].hasShadow) menus[i].shadow.hidden = true;
		}
	}

	for (i=num; i<menus.length; i++)
	{
		for (j=0; j<menus[i].activeItems.length; j++)
		{
			var tempArray = menus[i].activeItems[j].split("|");
			colorBg(menus[i].items[tempArray[0]], menus[i].bgColorOut);
			if (tempArray[1].indexOf("rollover:") != -1)
				menus[i].items[tempArray[0]].document.images[0].src = tempArray[1].split(":")[1];
			else
				colorText(menus[i].items[tempArray[0]], tempArray[1]);
		}
	}
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
			menus[i].main.hidden = true;
			if (menus[i].hasShadow) menus[i].shadow.hidden = true;
		}
	}

	for (i=0; i<menus.length; i++)
	{
		for (j=0; j<menus[i].activeItems.length; j++)
		{
			var tempArray = menus[i].activeItems[j].split("|");
			colorBg(menus[i].items[tempArray[0]], menus[i].bgColorOut);
			if (tempArray[1].indexOf("rollover:") != -1)
				menus[i].items[tempArray[0]].document.images[0].src = tempArray[1].split(":")[1];
			else
				colorText(menus[i].items[tempArray[0]], tempArray[1]);
		}
	}
}

function debug()
{
	var win = window.open();
	win.document.open();
	win.document.write('<textarea cols=50 rows=25 wrap=virtual>Debug information isn\'t available in Netscape 4.</textarea>');
	win.document.close();
	win.focus();
}

var menus = new Array();