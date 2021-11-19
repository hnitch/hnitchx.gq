document.onkeydown = function(e) {
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
}

document.querySelectorAll("details[open]").forEach(d => d.removeAttribute("open"));
var profilePicture = document.getElementById("profilePicture");


if (window.location.host.toLowerCase() !== "portfolio-template-site.bookie0.repl.co" && window.location.hash.toLowerCase().trim() !== "#edit")  {
    document.querySelectorAll(".for-edit").forEach(d => d.remove());
    document.getElementById("toggleEdit").remove();
}
refreshIcons();
var profilePictureSwitch;
profilePictureSwitch = document.getElementById("projectsPage").parentElement.offsetTop;

window.addEventListener("scroll", function () 
{	
	if (window.scrollY >= profilePictureSwitch)
	{
		profilePicture.classList.remove("right"); 
		profilePicture.classList.add("left");
	}
	else if (window.scrollY)
	{
		profilePicture.classList.add("right");
		profilePicture.classList.remove("left");
	}
});


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

function allowingEdit() {
    return document.body.className.includes('edit');
}

function allowEdit(allow) {
    if (typeof(allow) !== "boolean") {allow = !allowingEdit();}
	if (allow == true) {
			document.body.classList.add("edit");
			document.querySelectorAll("*[ref]").forEach(a => a.setAttribute("contenteditable","true"));
	} else {
			document.body.classList.remove("edit");	
			document.querySelectorAll("*[ref]").forEach(a => a.removeAttribute("contenteditable"));
	} 
}

function refreshProjectData(event) {
    var projectContainer = event.path.find(e => e.className.includes("gridChild"));
    var projectURL = projectContainer.getElementsByClassName("input-projectURL")[0].value.trim();
    projectContainer.getElementsByClassName("input-projectURL")[0].setAttribute("value",projectURL);
    var projectLinks = projectContainer.getElementsByClassName("projectLinks")[0];
    if (projectURL == "") {
        projectLinks.href = "javascript: void(0);";
        projectLinks.target = "";
    } else {
        projectLinks.href = projectURL;
        projectLinks.target = "blank";
    }

    var imageURL = projectContainer.getElementsByClassName("input-imageSource")[0].value.trim();
    projectContainer.getElementsByClassName("input-imageSource")[0].setAttribute("value",imageURL);
    var img = projectContainer.getElementsByClassName("projectImages")[0];
    if (imageURL == "") {
        img.setAttribute("style","display: none;");
    } else {
        img.removeAttribute("style");
        img.setAttribute("src",imageURL);
    }
}


function refreshProfilePicture(event) {
    var input = event.target;
    input.setAttribute("value",input.value);
    profilePicture.src = input.value;
}

function refreshIcons() {
    var fieldsContainer = document.getElementsByClassName("for-edit-icons")[0];
    var fields = fieldsContainer.getElementsByClassName("for-edit");
    var f,icon,hr,sname;
    for (var i = 0;i < fields.length;i++) {
			f = fields[i];
			sname = f.getAttribute("for");
			if (!sname) {continue;}
			icon = document.getElementById("social-icon-" + sname);
			hr = f.value.trim();
			f.setAttribute("value",f.value);
			if (hr && sname == "email") {hr = 'mailto:' + hr;}
			if (!hr) {
					icon.setAttribute("style","display: none;");
					icon.href = "javascript: void(0);";
					icon.removeAttribute("target");
			} else {
					icon.removeAttribute("style");
					icon.href = hr;
					icon.setAttribute("target","blank");
			}
    }
}

allowEdit(false);
