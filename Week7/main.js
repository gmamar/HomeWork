"use strict";
var avatar = document.getElementById("avatar");
var userName = document.getElementById("uName");
var pRepo = document.getElementById("pRepo");
var rName = document.getElementById("repoName");
var srchBTN = document.getElementById("entrBTN");
var pInfo = document.getElementById("allInfo");
var rItems = document.getElementsByClassName("repoItems");
var srcEntry = document.getElementById("srcName");
var profileInformation = ["id", "gravatar_id", "url", "html_url", "followers_url", "following_url", "gists_url",
				   		"starred_url", "subscriptions_url", "organizations_url", "repos_url", "events_url", "received_events_url",
						 "type", "site_admin", "name", "company", "blog", "location", "email", "hireable", "bio", "public_repos",
						 "public_gists", "followers", "following", "created_at", "updated_at"];

// Get information from input text, and call API request function with main repo page.
function gitProfille() {
	rName.innerHTML = "";
	//alert("New requst");
	var link = 'https://api.github.com/users/' + srcEntry.value;
	mainRequest(link , 1);
	
}

// Get information from input text, and call API request function with details repo page.
function repoPage() {
	var repoPageLink = 'https://api.github.com/users/' + srcEntry.value + '/repos';
	mainRequest(repoPageLink, 2);
}

// Create unorderd list for repo names, add event listner for repo names details.
function renderRepo(repoinf) {
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

	//triger for mouse over to display every repo name details.
	rName.addEventListener("mouseover", function (event) {
			var repo = event.target.innerHTML;
			var p = document.getElementById("Disc");

			function issueAndDate(index, item) {
				if (repo == repoinf[item].name) {
					p.innerHTML = "Number of open issues: " + repoinf[item].open_issues +
						"<br>" + "Created Date: " + repoinf[item].created_at;
				}
			}
			repoinf.forEach(issueAndDate);
			rName.addEventListener("mouseleave", function () {
				p.innerHTML = "";
			});
		

	});
}

// API request, and decide witch function call depending on output of the request updated.
function mainRequest(targetPage, nextFun) {
	function processRequest() {
		if (xhr.readyState == 4) {
			var parsedInfo = JSON.parse(xhr.response);
			if (parsedInfo.message) {
				alert("Not found, or invaled profile name");
			} else if (nextFun === 1) {
				renderInfo(parsedInfo);
			} else if (nextFun === 2) {
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

// Display information for user name and repo number.
function renderInfo(info) {

	userName.innerHTML = "User name: " + info.login;;
	pRepo.innerHTML = "Public repos: " + info.public_repos;
	avatar.setAttribute("src", info.avatar_url); //	load User avatr
	pInfo.innerHTML = "";
	addFulllInfo(info);

	// Create list all profile details, load user information.
	function addFulllInfo(userData) {
		for (var i = 0; i < profileInformation.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = profileInformation[i] + ": " + userData[profileInformation[i]];
			pInfo.appendChild(li);
		}
	}

	// switch for disply and hide profile details list.
	function showInfo() {
		document.getElementById("allInfo").classList.toggle("show");
	}

	// Open new tab with GitHub profile page when click on profile picture.
	function openGit() {
		window.open(info[profileInformation[3]]);
	}

	userName.addEventListener("click", showInfo); // Listener to show and hide information list.
	avatar.addEventListener("click", openGit); // Listener on picture click and call function.
	pRepo.addEventListener("click", repoPage); // Listener to display profile name and repo number.	
}

// call faunction of the main profile page.
srchBTN.addEventListener("click", gitProfille);

//renew request every 1 minute, if input field not empty or contain whitspace.
if (srcEntry.value !== null && srcEntry.value !== "") {
	setInterval(gitProfille, 60000);
}
