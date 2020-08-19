const searchButton = document.getElementById('search-btn');
const input = document.getElementById('search-input');
const searchResult = document.getElementById('search-result');
const apiUrl = 'https://api.lyrics.ovh/suggest/';
const findLyrics = document.getElementById("lyrics");

searchButton.addEventListener('click',function(){
    const searchInput = input.value;
    if(searchInput){
        fetchApi();
    } else {
        alert('Please input your valid title');
    }
   input.value = '';

});

function fetchApi(){
    if(input.value) {
        fetch(apiUrl + input.value)
        .then(res => res.json())
        .then(data => getSearchResult(data));
    } 
};

function getSearchResult(search) {
    searchResult.innerHTML = "";
    for(let i = 0; i < 10; i++){
        let title = search.data[i].title;
        let artist = search.data[i].artist.name;
        // console.log(title);

        let Result = `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${title}</h3>
                <p class="author lead">Album by 
                <span class="ml-2 artist">${artist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onClick="getLyrics('${artist}','${title}')">Get Lyrics</button>
            </div>
        </div>
        `;
        searchResult.innerHTML += Result;
    }

}
        function getLyrics(artist, title){
            fetch(`https://api.lyrics.ovh/v1/'${artist}'/'${title}'`)
            .then(response => response.json())
            .then(data => {
               

               findLyrics.innerHTML = `<button class="btn btn-outline-success go-back text-white" id="get-back" onclick="getBack()">&lsaquo; back</button>
               <h2 class="text-success mb-4">${artist} - ${title}</h2>
               <pre class="lyric text-white" id="lyrics"> ${data.lyrics} </pre>`;
               searchResult.style.display = "none";

            });
        };

                function getBack(){
                    searchResult.style.display = "block";
                    findLyrics.style.display = "none";

                };

/* get lyrics */







