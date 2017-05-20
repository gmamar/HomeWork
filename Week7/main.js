"use strict";
var avatar = document.getElementById("avatar");
var userName = document.getElementById("uName");
var pRepo = document.getElementById("pRepo");
var sBTN = document.getElementById("entrBTN");
var pInfo = document.getElementById("allInfo");
var profileInformation = ["id", "gravatar_id", "url", "html_url", "followers_url", "following_url", "gists_url",
						"starred_url", "subscriptions_url", "organizations_url", "repos_url", "events_url", "received_events_url",
						 "type", "site_admin", "name", "company", "blog", "location", "email", "hireable", "bio", "public_repos",
						 "public_gists", "followers", "following", "created_at", "updated_at"];

function gitProfille(){
	var srcEntry = document.getElementById("srcName").value;
	var link = 'https://api.github.com/users/' + srcEntry;
	mainRequest(link);
}

function repoPage(){
	var repoPageLink = 'https://api.github.com/users/' + "gmamar" + '/repos';
	console.log(repoPageLink);
	mainRequest(repoPageLink);
}

function mainRequest(targetPage) {
	function processRequest() {
		if (xhr.readyState == 4) {
			console.log(xhr.response);
			renderInfo(xhr.response);
		}
	}
	
	var requestURL = targetPage;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', requestURL, true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	console.log(xhr.onreadystatechange);
}

function renderInfo(info) {
	var parsedInfo = JSON.parse(info);
	userName.innerHTML = "User name: " + parsedInfo.login;;
	pRepo.innerHTML = "Public repos: " + parsedInfo.public_repos;
	avatar.setAttribute("src", parsedInfo.avatar_url); //	load User avatr
	pInfo.innerHTML = "";
	addFulllInfo(parsedInfo);

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
		window.open(parsedInfo[profileInformation[3]]);
	}

	userName.addEventListener("click", showInfo);
	avatar.addEventListener("click", openGit);
//	pRepo.addEventListener("click", repoPage);

}

function repo(){
	
}


sBTN.addEventListener("click", gitProfille);
