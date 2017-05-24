"use strict";
var avatar = document.getElementById("avatar");
var rName = document.getElementById("repoName");
var userName = document.getElementById("uName");
var pRepo = document.getElementById("pRepo");
var sBTN = document.getElementById("entrBTN");
var pInfo = document.getElementById("allInfo");
var srcEntry = document.getElementById("srcName");
var profileInformation = ["id", "gravatar_id", "url", "html_url", "followers_url", "following_url", "gists_url",
				   		"starred_url", "subscriptions_url", "organizations_url", "repos_url", "events_url", "received_events_url",
						 "type", "site_admin", "name", "company", "blog", "location", "email", "hireable", "bio", "public_repos",
						 "public_gists", "followers", "following", "created_at", "updated_at"];

function gitProfille() {


	var link = 'https://api.github.com/users/' + srcEntry.value;
	mainRequest(link);
}

function repoPage() {

	var repoPageLink = 'https://api.github.com/users/' + srcEntry.value + '/repos';
	mainRequest(repoPageLink);
}

function renderRepo(repoinf) {
	function repoNameList(index, item) {
		var lil = document.createElement("li");
		console.log(repoinf[item].name);
		lil.innerHTML = repoinf[item].name;
		console.log(lil);
		rName.appendChild(lil);
	}
	repoinf.forEach(repoNameList);

}

function mainRequest(targetPage) {
	function processRequest() {
		if (xhr.readyState == 4) {
			var parsedInfo = JSON.parse(xhr.response);
			if (parsedInfo.login) {
				renderInfo(parsedInfo);
			} else if (parsedInfo[0].archive_url) {
				renderRepo(parsedInfo);
			}
		}
	}

	var requestURL = targetPage;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', requestURL, true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
}

function renderInfo(Info) {
	console.log(Info);
	userName.innerHTML = "User name: " + Info.login;;
	pRepo.innerHTML = "Public repos: " + Info.public_repos;
	avatar.setAttribute("src", Info.avatar_url); //	load User avatr
	pInfo.innerHTML = "";
	addFulllInfo(Info);

	function addFulllInfo(userData) { // load user information
		for (var i = 0; i < profileInformation.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = profileInformation[i] + ": " + userData[profileInformation[i]];
			pInfo.appendChild(li);
		}
	}

	function showInfo() {
		document.getElementById("allInfo").classList.toggle("show");
	}

	function openGit() {
		window.open(Info[profileInformation[3]]);
	}

	userName.addEventListener("click", showInfo);
	avatar.addEventListener("click", openGit);
	pRepo.addEventListener("click", repoPage);

}

function repo() {

}


sBTN.addEventListener("click", gitProfille);
