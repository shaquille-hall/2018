Init = {
	loaded: false,
	init: function() {
		this.getStandardNavBar();
		this.getMobileNavBar();
		this.getQuotes();
		this.getAboutMe();
		this.getResume();
		this.getSkills();
		this.getProjects();
	},

	showMobile: function() {
		this.showInfo();
		this.showMobileNavBar();
	},

	hideMobile: function() {
		this.hideMobileNavBar();
	},

	showStandard: function() {
		this.hideInfo();
		this.showStandardNavBar();
		
	},

	hideStandard: function() {
		this.hideStandardNavBar();
	},

	showMobileNavBar: function() {
		$('.mobileNavBar').show();
	},

	hideMobileNavBar: function() {
		$('.mobileNavBar').hide();
	},

	showStandardNavBar: function() {
		$('.standardNavBar').show();
	},

	hideStandardNavBar: function() {
		$('.standardNavBar').hide();
	},

	hideInfo: function() {
		var contentChildren = $('.content').children();
		for (var i=0; i<contentChildren.length; i++) {
			if ($(contentChildren[i]).attr('id')) {
				if (contentChildren[i].id != 'contactModal' && contentChildren[i].id != 'navBar') {
					$(contentChildren[i]).hide();
				}
			}
		}
	},

	showInfo: function() {
		var contentChildren = $('.content').children();
		for (var i=0; i<contentChildren.length; i++) {
			if ($(contentChildren[i]).attr('id')) {
				if (contentChildren[i].id != 'contactModal') {
					$(contentChildren[i]).show();
				}
			}
		}
	},

	getStandardNavBar: function() {
	    var self = this;
	    var navBar = $("#navBar");

	    var standardNavBar = document.createElement('div');
	    $(standardNavBar).addClass('standardNavBar');

	    for (var i=0; i<navBarData.navbarItems.length; i++) {
	        var listItem = document.createElement("li");
	        var link = document.createElement("a");
	        $(link).html(navBarData.navbarItems[i].itemName);
	        if (i<navBarData.navbarItems.length -1) {
	            $(link).attr("href", navBarData.navbarItems[i].url)
	            	.click(self.assignClick($("#"+((navBarData.navbarItems[i].url.slice(1)))), self, true));
	        } else {
	            $(link).attr("href", "#")
	            	.addClass(navBarData.navbarItems[i].url.slice(1));
	        }
	        $(listItem).append(link);
	        $(standardNavBar).append(listItem);
	    }

	    $(standardNavBar).hide();
	    $(navBar).append(standardNavBar);
	},

	getMobileNavBar: function() {
		var self = this;
        var navBar = $("#navBar");

        var mobileNavBar = document.createElement('div');
        $(mobileNavBar).addClass('mobileNavBar');

        var dropdownMenu = document.createElement("span");
        $(dropdownMenu).addClass('dropdownMenu')
        	.html("Menu").click(self.toggleMobileDropdown);

        var dropdownLinks = document.createElement("div");
        $(dropdownLinks).addClass('dropdownLinks');
                      
        for (var i=0; i<navBarData.navbarItems.length; i++) {
            var listItem = document.createElement("li");
            var link = document.createElement("a");
            $(link).html(navBarData.navbarItems[i].itemName);

            if (i<navBarData.navbarItems.length -1) {
                $(link).attr("href", navBarData.navbarItems[i].url)
                	.click(self.assignTap($("#"+((navBarData.navbarItems[i].url.slice(1)))), self,true));
            } else {
                $(link).attr("href", "#")
                	.addClass(navBarData.navbarItems[i].url.slice(1));
            }

            $(listItem).append(link);	
            $(dropdownLinks).append(listItem);               
        }

        $(mobileNavBar).hide();
        $(dropdownLinks).hide();
        $(mobileNavBar).append(dropdownMenu, dropdownLinks);        
        navBar.append(mobileNavBar);      
	},

	assignClick: function(n, _this) {
	    return function() {  
	        if (n != null) {
	             _this.scrollToStandardDiv(n);
	        } 
	    };
	},

	assignTap: function(n, _this) {
	    return function() {  	        
	        if (n != null) {
	             _this.scrollToMobileDiv(n);
	        } 
	    };
	},

	toggleMobileDropdown: function() {
		if ($('.dropdownLinks').css("display") == "none") {			
			$('.dropdownLinks').show();
		} else {			
			$('.dropdownLinks').hide();
		}
	},

	scrollToMobileDiv: function(mobileDiv) {	   
	    if ($(mobileDiv).attr('id') == 'navBar') {
	    	$('html, body').animate({scrollTop: ($('#home').offset().top - (2 * $('.dropdownMenu').height()))}, 1000);
	    } else {
	    	$('html, body').animate({scrollTop: ($(mobileDiv).offset().top - (2 * $('.dropdownMenu').height()))}, 1000);

	    }
	    this.toggleMobileDropdown();
	    document.getElementById("footer").style.marginTop = ($(mobileDiv).attr('id') == "navBar") ? "0px" : "100px"; //.css("margin-top", "100px");
	},

	scrollToStandardDiv: function(standardDiv) {
		var self = this;	   
	    for (var i=0; i<$("#"+$(standardDiv).attr("id")).siblings().length; i++) {	       
	        if( $($("#"+$(standardDiv).attr("id")).siblings()[i]).attr("id")) {	            
	            if($($("#"+$(standardDiv).attr("id")).siblings()[i]).attr("id") != "navBar") {
	                if ($($("#"+$(standardDiv).attr("id")).siblings()[i]).attr("id") != "footer") {
	                		 self.hideSiblingNodes(standardDiv,i);	                	                    	                   
	                }
	            }
	        }
	    }

	    $("#"+($(standardDiv).attr('id'))).show();
	    //$(document.getElementById($(d).attr('id'))).switchClass('hide', 'show', 4000);
	    if ($(standardDiv).attr('id') == 'navBar') {
	    	$('html, body').animate({ scrollTop: ($('#home').offset().top - $("#navBar").height()) }, 1000);
	    } else {
	    	$('html, body').animate({ scrollTop: ($('#headerPic').height() - $("#navBar").height()) }, 1000);
	    }
	    document.getElementById("footer").style.marginTop = ($(standardDiv).attr('id') == "navBar") ? "0px" : "100px"; //.css("margin-top", "100px");
	},

	 hideSiblingNodes: function(node, index) {
	    $($(document.getElementById($(node).attr('id'))).siblings()[index]).hide();
	},

	getQuotes: function() {
	    var quoteDivs = $(".quote");  
	    var usedQuotes = []; 

	    for (var i=0; i<quoteDivs.length; i++) {
	        var randomQuote = Math.floor((Math.random() * quotesData.webQuotes.length) + 0);
	        for (var j=0; j<usedQuotes.length; j++) {
	             if (usedQuotes[i] == randomQuote) {
	                randomQuote = Math.floor((Math.random() * quotesData.webQuotes.length) + 0);
	                j = 0;
	            }
	        }

	        var quote = quotesData.webQuotes[randomQuote].quote;
	        quote += "<br />";
	        quote += quotesData.webQuotes[randomQuote].author;
	        $(quoteDivs[i]).html(quote);
	        usedQuotes += randomQuote;
	    }
	},

	getAboutMe: function() {
	    var sectionHeader = document.createElement("h1");
	    $(sectionHeader).addClass('sectionHeader').html("About Me");

	    var aboutMeSection = $("#aboutMe");	    
	    $(aboutMeSection).append(sectionHeader);

        for (var i=0; i<Object.keys((aboutMeData.aboutMe)).length; i++) {
            var aboutMeParagraph = document.createElement("p");
            $(aboutMeParagraph).addClass('aboutMe')
            	.html(aboutMeData.aboutMe['paragraph'+i].text.join('\n'));
            $(aboutMeSection).append(aboutMeParagraph);
        }

	    $(aboutMeSection).hide();
	},

	getResume: function() {
		self = this;
	    var sectionHeader = document.createElement("h1");
	    $(sectionHeader).addClass('sectionHeader').html("Resume");
	    
	    var resumeSection = ("#resume");
	    $(resumeSection).append(sectionHeader);      
	    
        for (var i=0; i<(resumeData.sections.length); i++) {
            standardResumeHeader = self.createStandardResumeHeader(resumeData, i);
            $(resumeSection).append(standardResumeHeader);

            for (var j=0; j<(Object.keys(resumeData.sections[i]).length - 1); j++) {                                
                var standardResumeLines = self.createStandardResumeLines();
                var standardResumeElements = self.createStandardResumeElements();                    
                var info = self.addStandardResumeInfo(resumeData, i, j, standardResumeElements, standardResumeLines);    

                var resumeBlock = document.createElement('div');
                $(resumeBlock).addClass('resumeBlock')
                	.append(info[0], info[1]);
               
                if ($(info[2]).children()) {
                    $(resumeBlock).append(info[2]);
                }

                $(resumeSection).append(resumeBlock);
           }
       }  

       $("#resume").hide();
	},

	createStandardResumeHeader: function(data, j) {
	    var resumeHeader = document.createElement("h1");
	    $(resumeHeader).addClass('resumeHeader')
	    	.html(data.sections[j].header);
	    return resumeHeader;
	},

	createStandardResumeElements: function(data) {
	    var t,jt,da,de,l;
	    t = document.createElement('p');
	    $(t).addClass('title');
	    jt = document.createElement('p');
	    $(jt).addClass('jobTitle');
	    da = document.createElement('p');
	    $(da).addClass('date');
	    de = document.createElement('p');
	    $(de).addClass('description');
	    l = document.createElement('p');

	    var rELS = [t,jt,da,de,l]
	    return rELS;
	},

	createStandardResumeLines: function(data, j) {
	    var rL1,rL2,rL3;
	    rL1 = document.createElement('div');
	    $(rL1).addClass('resumeLine');
	    rL2 = document.createElement('div');
	    $(rL2).addClass('resumeLine');
	    rL3 = document.createElement('div');
	    $(rL3).addClass('resumeLine');

	    var rLs = [rL1,rL2,rL3];
	    return rLs;
	},

	addStandardResumeInfo: function(data, i, j, elements, lines) {	    
	    if ($(data.sections[i]['info'+j]).attr('title')) {
	        $(elements[0]).html(data.sections[i]['info'+j].title);
	        $(lines[0]).append(elements[0]);
	    }

	    if (($(data.sections[i]['info'+j]).attr('location')) && !($(data.sections[i]['info'+j]).attr('jobTitle'))) {
	         $(elements[4]).html(data.sections[i]['info'+j].location)
	         	.addClass('special');
	         $(lines[0]).append(elements[4]);

	    } else if (($(data.sections[i]['info'+j]).attr('location')) && ($(data.sections[i]['info'+j]).attr('jobTitle')))  {
	        $(elements[1]).html(data.sections[i]['info'+j].jobTitle);
	        $(lines[0]).append(elements[1]);
	        $(elements[4]).html(data.sections[i]['info'+j].location)
	        	.addClass('location');
	        $(lines[2]).append(elements[4]);
	    }
	    if ($(data.sections[i]['info'+j]).attr('date')) {
	        $(elements[2]).html(data.sections[i]['info'+j].date);
	        $(lines[1]).append(elements[2]);
	    }
	    
	    if ($(data.sections[i]['info'+j]).attr('description')) {
	        $(elements[3]).html(data.sections[i]['info'+j].description.join('<br />'));
	        $(lines[1]).append(elements[3]);
	    }
	    return lines;
	},

	getSkills: function() {
		var self = this;
	    var sectionHeader = document.createElement("h1");
	    $(sectionHeader).addClass('sectionHeader')
	    	.html( "Skills");
	    $("#skills").append(sectionHeader);
	          
        for (var i=0; i<Object.keys(skillsData).length; i++) {            
            var skillsHeader = document.createElement('h1');
            $(skillsHeader).html( Object.keys(skillsData)[i])
            	.addClass('skillsHeader');
            $("#skills").append(skillsHeader);

            var skillsBlock = document.createElement('div');
            $(skillsBlock).addClass('skillsBlock');
         	
            for (var j=0; j<skillsData[Object.keys(skillsData)[i]].length; j++) {
            	var abilityName = document.createElement("p");
                $(abilityName).addClass(' abilityName')
                	.html(skillsData[Object.keys(skillsData)[i]][j].skill);

                var abilityRating = document.createElement("p");
                $(abilityRating).addClass(' abilityRating')
               		.html("<div class='star-rating unfilled-star'>&#9733;</div>" + 
               				"<div class='star-rating unfilled-star'>&#9733;</div>" + 
                			"<div class='star-rating unfilled-star'>&#9733;</div>" +
                			"<div class='star-rating unfilled-star'>&#9733;</div>" +
                			"<div class='star-rating unfilled-star'>&#9733;</div>");
          
                var abilityLine = document.createElement("div");
                $(abilityLine).addClass('abilityLine')
                	.append(abilityName, abilityRating);
                                            
                self.addColorToRating(abilityRating, parseInt(skillsData[Object.keys(skillsData)[i]][j].experience));
                $(skillsBlock).append(abilityLine);
            }

            $("#skills").append(skillsBlock)
            	.hide();
        }
	},

	addColorToRating: function(rating, time) {
	    for (var i=0; i<time; i++) {
	        $($(rating).children()[i]).switchClass('unfilled-star', 'filled-star');
	    }
	},

	getProjects: function() {
	    var sectionHeader = document.createElement("h1");
	    $(sectionHeader).addClass('sectionHeader')
	   		.html("Projects");
	    $("#projects").append(sectionHeader);
	   
        for (var i=0; i<projectsData.projects.length; i++) {      
         	var projectImg = document.createElement('img');
         	$(projectImg).attr("src", projectsData.projects[i].imgSrc)
         		.addClass('projectImage');

         	var projectLink = document.createElement('a');
            $(projectLink).addClass("projectLink")
            	.attr("href", projectsData.projects[i].url)

            var projectImgDiv = document.createElement('div');
            $(projectImgDiv).addClass('projectImageDiv');
                            
            var projectTextLink = document.createElement('p');
            $(projectTextLink).html(projectsData.projects[i].name)
            	.addClass('projectTextLink');

            $(projectLink).append(projectImg, projectTextLink);   
            $(projectImgDiv).append(projectLink);
            $("#projects").append(projectImgDiv)
            	.hide();
        } 
    } 
	   
}

