"use strict";
var avatar = document.getElementById("avatar");
var userName = document.getElementById("uName");
var pRepo = document.getElementById("pRepo");
var rName = document.getElementById("repoName");
var srchBTN = document.getElementById("entrBTN");
var pInfo = document.getElementById("allInfo");
var rItems = document.getElementsByClassName("repoItems");
var srcEntry = document.getElementById("srcName");
var srcFilter = document.getElementById("filter");
var followerName = document.getElementById("folowerName");
var followersList = document.getElementById("followPic");
var followersData;
var profileInformation = ["id", "gravatar_id", "url", "html_url", "followers_url", "following_url", "gists_url",
				   		"starred_url", "subscriptions_url", "organizations_url", "repos_url", "events_url", "received_events_url",
						 "type", "site_admin", "name", "company", "blog", "location", "email", "hireable", "bio", "public_repos",
						 "public_gists", "followers", "following", "created_at", "updated_at"];

// Get information from input text, and call API request function with main repo page.
function gitProfille() {
	followersList.innerHTML = "";
	rName.innerHTML = "";
	//alert("New requst");
	var link = 'https://api.github.com/users/' + srcEntry.value;
//		mainRequest(link, 1);
	var promise = mainRequest(link, 1);
	promise.then(function (test) {
		console.log(test);
	}).catch(Error);

}

// Get information from input text, and call API request function with details repo page.
function repoPage() {
	var repoPageLink = 'https://api.github.com/users/' + srcEntry.value + '/repos';
	mainRequest(repoPageLink, 2);
	var followers = "https://api.github.com/users/" + srcEntry.value + "/followers"
	mainRequest(followers, 3);

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

	var srcVal = srcFilter.value;
	console.log(srcVal);

	//filter the output repo list names.
	var filterRepoinf = repoinf.filter(function (Val) {
		console.log(Val);
		if (!srcVal) {
			return true;
		}
		if (srcVal == Val.language) {
			return true;
		} else if (srcVal !== Val.language) {
			return false;
		}
	});

	console.log(filterRepoinf);
	filterRepoinf.forEach(repoNameList);

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

// API request, and decide witch function call depending on output of the request updatedgit.
function mainRequest(targetPage, nextFun) {

	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		
		console.log(targetPage);
		xhr.open("GET", targetPage, true);
		console.log(xhr);
		xhr.onload = function () {
				if (xhr.status == 200) {
					alert(xhr.status)
					resolve(JSON.parse(xhr.response));
				} else {
					reject(xhr.statusText);
				}
			}
		xhr.onerror = function (){
			reject(xhr.statusText);
		};
		xhr.send();
	});

//		function processRequest() {
//			if (xhr.readyState == 4) {
//				var parsedInfo = JSON.parse(xhr.response);
//				if (parsedInfo.message) {
//					alert("Not found, or invaled profile name");
//				} else if (nextFun === 1) {
//					renderInfo(parsedInfo);
//				} else if (nextFun === 2) {
//					renderRepo(parsedInfo);
//				} else if (nextFun === 3) {
//					followersData = parsedInfo.map(
//						function (repo) {
//	
//							return {
//								name: repo.login,
//								html_url: repo.html_url,
//								avatar: repo.avatar_url
//							}
//						}
//					)
//					followersInfo(followersData);
//				}
//			}
//		}
//	
//		
//		var xhr = new XMLHttpRequest();
//		xhr.open('GET', targetPage, true);
//	console.log(xhr);
//		xhr.send();
//		xhr.onreadystatechange = processRequest;
}

//this function display followers informations.
function followersInfo(followers) {

	followersList.innerHTML = "";

	function showInfo(index, item) {
		var pic = document.createElement("img");
		pic.setAttribute("src", followers[item].avatar)
		pic.setAttribute("id", followers[item].name);
		var li = document.createElement("li");
		li.appendChild(pic);
		followersList.appendChild(li);
	}
	followers.forEach(showInfo);
	document.getElementById("followTitle").innerHTML = "Followers:"
	followPic.addEventListener("mouseover", function (event) {
		if (event.target.id !== null) {
			followerName.innerHTML = event.target.id;
		}
	});

	followPic.addEventListener("mouseleave", function () {
		followerName.innerHTML = "";
	})
	//	function showFoName




}

// Display information for user name and repo number.
function renderInfo(info) {

	userName.innerHTML = "User name: " + info.login;;
	pRepo.innerHTML = "Public repos: " + info.public_repos;
	avatar.setAttribute("src", info.avatar_url); //	load User avatar
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
		document.getElementById("allInfoTitle").classList.toggle("show")
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
//if (srcEntry.value !== null && srcEntry.value !== "") {
//	setInterval(gitProfille, 60000);
//}
