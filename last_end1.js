function loadMovies(srchMovie) {
	//This function keeps track of changes to the xhr request
	function processRequest() {
		console.log(xhr.readyState);
		if (xhr.readyState == 4) {
			console.log("xhr request DONE SON");
			renderMovies(xhr.response);

			movies.Search.forEach(myMovies);
			// Call a function which renders the response
		}
	}
	
	var myNode = document.getElementById("info");
	while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
	}
	var textInput = document.getElementById("srchVal")
	var srchMovie = textInput.value;
	console.log("retrieving movie data request");
	var requestURL = 'http://www.omdbapi.com/?s=' + srchMovie;
	var xhr = new XMLHttpRequest();

	var resoltTitle = document.getElementById("welcom");
	resoltTitle.innerHTML = "Movies that containe " + srchMovie + " " + "in titel";

	//Build an XHR request and then send it.
	//Read this for more info: https://www.kirupa.com/html5/making_http_requests_js.htm
	xhr.open('GET', requestURL, true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
}

function renderMovies(info) {
	var parsedInfo = JSON.parse(info);
	movies = parsedInfo;
	return movies;
}

function myMovies(item, index) {

	var H = document.createElement("h1");
	var movieName = document.createTextNode(movies.Search[index].Title);
	H.appendChild(movieName);

	var createMainList = document.createElement("ul");
	createMainList.setAttribute("class", "listInfo");
	document.getElementById("info").appendChild(createMainList);
	var mainList = document.getElementsByClassName("listInfo");

	createMainList.appendChild(H);

	function createList(movieInformation) {
		var listItem = document.createElement("li");
		listItem.innerHTML = movieInformation;
		mainList[index].appendChild(listItem);
	}

	function createPoster(moviePoster) {
		var listItem = document.createElement("li");
		mainList[index].appendChild(moviePoster);
	}

	function creatElement(listeLement) {
		var str = "More Information.";
		var link = str.link("http://www.imdb.com/title/" + listeLement);
		createList(link);
	}

	function createImg() {
		var Photo = document.createElement("img");
		Photo.setAttribute("src", movies.Search[index].Poster);
		Photo.setAttribute("alt", movies.Search[index].Title + " " + "poster");

		createPoster(Photo);
	}


	createList("Type: " + movies.Search[index].Type);
	createList("Year: " + movies.Search[index].Year);
	creatElement(movies.Search[index].imdbID);
	createImg();
}
