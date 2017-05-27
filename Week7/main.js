"use strict";
var avatar = document.getElementById("avatar");
var userName = document.getElementById("uName");
var pRepo = document.getElementById("pRepo");
var rName = document.getElementById("repoName");
var sBTN = document.getElementById("entrBTN");
var pInfo = document.getElementById("allInfo");
var rItems = document.getElementsByClassName("repoItems");
var srcEntry = document.getElementById("srcName");
var profileInformation = ["id", "gravatar_id", "url", "html_url", "followers_url", "following_url", "gists_url",
				   		"starred_url", "subscriptions_url", "organizations_url", "repos_url", "events_url", "received_events_url",
						 "type", "site_admin", "name", "company", "blog", "location", "email", "hireable", "bio", "public_repos",
						 "public_gists", "followers", "following", "created_at", "updated_at"];

function gitProfille() { // Get information from input text, and call API request function with main repo page.
	rName.innerHTML = "";
	//alert("New requst");
	var link = 'https://api.github.com/users/' + srcEntry.value;
	mainRequest(link);
}

function repoPage() {  // Get information from input text, and call API request function with details repo page.
	var repoPageLink = 'https://api.github.com/users/' + srcEntry.value + '/repos';
	mainRequest(repoPageLink);
}

function renderRepo(repoinf) { // Create unorderd list for repo names, add event listner for repo names details.
	rName.innerHTML = "";
	var i = 0

	function repoNameList(index, item) {
		var li = document.createElement("li");
		li.setAttribute("id", "repoItem_" + i);
		li.setAttribute("class", "repoItems");
		li.innerHTML = repoinf[item].name;
		rName.appendChild(li);
		i++;
	}
	repoinf.forEach(repoNameList);
	rName.addEventListener("mouseover", function (event) { //triger for mouse over to display every repo name details.
		var repo = event.target.innerHTML;
		var p = document.getElementById("Disc")
		for (var x = 0; x < repoinf.length; x++) {
			if (repo == repoinf[x].name) {
				p.innerHTML = "Number of open issues: " + repoinf[x].open_issues +
					"<br>" + "Created Date" + repoinf[x].created_at;
			}
			rName.addEventListener("mouseleave", function () { // Triger for mouse when leave to remove repo name details.
				p.innerHTML = "";
			});
		}

	});
}

function mainRequest(targetPage) { // API request, and decide witch function call depending on output of the request.
	function processRequest() {
		if (xhr.readyState == 4) {
			var parsedInfo = JSON.parse(xhr.response);
			if (parsedInfo.message){
				alert("Not found, or invaled profile name");
			} else if (parsedInfo.login) {
				renderInfo(parsedInfo);
			} else if (parsedInfo[0].archive_url) {
				renderRepo(parsedInfo);
			}; 
		}
	}

	var requestURL = targetPage;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', requestURL, true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
}

function renderInfo(Info) { // Display information for user name and repo number.
	
	userName.innerHTML = "User name: " + Info.login;;
	pRepo.innerHTML = "Public repos: " + Info.public_repos;
	avatar.setAttribute("src", Info.avatar_url); //	load User avatr
	pInfo.innerHTML = "";
	addFulllInfo(Info);

	function addFulllInfo(userData) { // Create list all profile details, load user information.
		for (var i = 0; i < profileInformation.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = profileInformation[i] + ": " + userData[profileInformation[i]];
			pInfo.appendChild(li);
		}
	}

	function showInfo() { // switch for disply and hide profile details list.
		document.getElementById("allInfo").classList.toggle("show");
	}

	function openGit() { // Open new tab with GitHub profile page when click on profile picture.
		window.open(Info[profileInformation[3]]);
	}

	userName.addEventListener("click", showInfo); // Listener to show and hide information list.
	avatar.addEventListener("click", openGit); // Listener on picture click and call function.
	pRepo.addEventListener("click", repoPage); // Listener to display profile name and repo number.	
}

sBTN.addEventListener("click", gitProfille); // call faunction of the main profile page.
setInterval(gitProfille, 60000);