function init()
{
    var rollover = "rollover:" + WgsRoot + "includes/tridown.gif:" + WgsRoot + "includes/tridown.gif";
    var rollover2 = "rollover:" + WgsRoot + "includes/tri.gif:" + WgsRoot + "includes/tri.gif";
    //Help
	//Main Menu items:
	menus[0] = new menu(22, "horizontal", 160, 10, -2, -2, "#CACAFF", "#0000A0", "Verdana,Helvetica", 9, 
		"bold", "bold", "black", "white", 1, "gray", 2, rollover, false, true, true, true, 12, true, 4, 4, "black");
	menus[0].addItem(WgsRoot + "index.html", "", 100, "center", "Home", 0);
	menus[0].addItem("#", "", 120, "center", "Readings", 5);
	menus[0].addItem("#", "", 120, "center", "Bloomsday", 3);
	menus[0].addItem("#", "", 120, "center", "Joyce", 2);
	menus[0].addItem("#", "", 100, "center", "Yeats", 4);
	menus[0].addItem("#", "", 120, "center", "Players", 1);

//Sub Menu for 2nd Main Menu Item ("Readings"):
	menus[5] = new menu(400, "vertical", 0, 0, -5, -5, "#CACAFF", "#0000A0", "Verdana,Helvetica", 9, "bold", 
		"bold", "black", "white", 1, "gray", 2, 62, false, true, false, true, 6, true, 4, 4, "black");
	menus[5].addItem(WgsRoot + "Joyce/Bloomsday/2015.html", "", 22, "left", "Bloomsday 2015", 0);

//Sub Menu for 2nd Main Menu Item ("Players"):
	menus[1] = new menu(280, "vertical", 0, 0, -5, -5, "#CACAFF", "#0000A0", "Verdana,Helvetica", 9, "bold", 
		"bold", "black", "white", 1, "gray", 2, 62, false, true, false, true, 6, true, 4, 4, "black");
	menus[1].addItem(WgsRoot + "contact.html", "", 22, "left", "Contact", 0);
	menus[1].addItem(WgsRoot + "players.html", "", 22, "left", "Who We Are", 0);
	menus[1].addItem(WgsRoot + "archives.html", "", 22, "left", "Archives", 0);
	menus[1].addItem(WgsRoot + "announcements.html", "", 22, "left", "Subscribe to Announcements List", 0);

//Sub Menu for 3rd Main Menu Item ("Joyce"):
	menus[2] = new menu(120, "vertical", 0, 0, -5, -5, "#CACAFF", "#0000A0", "Verdana,Helvetica", 9, "bold", 
		"bold", "black", "white", 1, "gray", 2, 62, false, true, false, true, 6, true, 4, 4, "black");
	menus[2].addItem(WgsRoot + "Joyce/index.html", "", 22, "left", "James Joyce", 0);
//	menus[2].addItem("#", "", 22, "left", "The Other Bloomsday", 3);
	menus[2].addItem(WgsRoot + "Joyce/links.html", "", 22, "left", "Links", 0);

//Sub Menu for 4th Main Menu Item ("The Other Bloomsday"):
	menus[3] = new menu(200, "vertical", 0, 0, -5, -5, "#CACAFF", "#0000A0", "Verdana,Helvetica", 9, "bold", 
		"bold", "black", "white", 1, "gray", 2, 62, false, true, false, true, 6, true, 4, 4, "black");
	menus[3].addItem(WgsRoot + "Joyce/Bloomsday/2015.html", "", 22, "left", "Bloomsday 2015", 0);
	menus[3].addItem(WgsRoot + "Joyce/Bloomsday/2015/press-release.html", "", 22, "left", "Press Release", 0);
	menus[3].addItem(WgsRoot + "archives.html", "", 22, "left", "Previous Bloomsdays", 0);

//Sub Menu for 5th Main Menu Item ("Yeats"):
	menus[4] = new menu(130, "vertical", 0, 0, 0, 0, "#CACAFF", "#0000A0", "Verdana,Helvetica", 9, "bold", 
		"bold", "black", "white", 1, "gray", 2, rollover2, false, true, false, false, 0, true, 4, 4, "black");
	menus[4].addItem(WgsRoot + "Yeats/index.html", "", 22, "left", "W. B. Yeats", 0);

} //OUTER CLOSING BRACKET. EVERYTHING ADDED MUST BE ABOVE THIS LINE.
