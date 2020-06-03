const movieDB = new MovieDB;
let masterQuery;



//get search string data
const uiSearchData = document.getElementById('findMovie'),
      uiSearchButton = document.getElementById('searchBtn')
      uiRender = document.getElementById('render')
      uiShowMovie = document.getElementById('showMovie')
      uiBackButton = document.getElementById('backBtn');


uiBackButton.style.display = "none";

function searchMovie(e) {
    masterQuery = localStorage.getItem("master");
    console.log(masterQuery+" reload");
    if(uiSearchData.value === "" && masterQuery ===""){
        alert("Please enter a movie name");
    }else {
        if(uiSearchData.value!=="") {
            masterQuery = uiSearchData.value;
            localStorage.setItem('master',masterQuery);
        }
        uiBackButton.style.display = "none";
        uiRender.style.display = "flex";
        uiShowMovie.innerHTML = '';
        uiRender.innerHTML = "<img src='spinner.gif' />";
        uiSearchData.value= "";
        movieDB.getData(masterQuery)
        .then(res => res.json())
        .then(data => {
            let output = '';
            const results = data.results;
            results.forEach( m => {
                output += `
                    <div class="card">
                        <img src="https://image.tmdb.org/t/p/w500${m.poster_path}" id='${m.id}'>
                        <h3>${m.original_title}</h3>
                        <!--  <p>${m.overview}</p> -->
                        <br>
                    </div>
                `;
            })
            uiRender.innerHTML = output;
        });
    }
}



function displayMovie(e) {
    if(e.target.value !== null ) {
        uiRender.style.display = "none";
        uiBackButton.style.display = "block";
        movieDB.getMovie(e.target.id)
        .then(res => res.json())
        .then(m => {
            uiShowMovie.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${m.poster_path}" width='200px' id=${m.id}>
                <div>
                    <h1> ${m.original_title} (${m.release_date})</h1>
                    <h5> Runtime: ${m.runtime} min </h5> Genre: ${m.genres.map(m => m.name)}
                    <p>${m.overview}</p>
                    <p> view <a href=${m.homepage} target="_blank">more</a> </p>
                </div>
            `;
        });
    }
}


uiSearchButton.addEventListener('click',searchMovie);
uiRender.addEventListener('click', displayMovie);
uiBackButton.addEventListener('click', searchMovie);