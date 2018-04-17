var navBarData = loadNavBar();
var quotesData = loadQuotes();
var aboutMeData = loadAboutMe();
var resumeData = loadResume();
var skillsData = loadSkills();
var projectsData = loadProjects();

function loadNavBar() {
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/data/navigation.js", false);
    xhttp.send();
    var data = jQuery.parseJSON(xhttp.responseText);
    return data;
}


function loadQuotes() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/data/quotes.js", false);
    xhttp.send();
    var quotes = jQuery.parseJSON(xhttp.responseText);
    return quotes;
}

function loadAboutMe() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/data/aboutMe.js", false);
    xhttp.send();
    var data = jQuery.parseJSON(xhttp.responseText);
    return data;
}

function loadResume() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/data/resume.js", false);
    xhttp.send();
     var data = jQuery.parseJSON(xhttp.responseText);
     return data;
}

function loadSkills() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/data/skills.js", false);
    xhttp.send();
    var skills = jQuery.parseJSON(xhttp.responseText);
    return skills;
}

function loadProjects() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/data/projects.js", false);
    xhttp.send();
    var data = jQuery.parseJSON(xhttp.responseText);
    return data;
}