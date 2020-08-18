const searchButton = document.getElementById('search-btn');
const input = document.getElementById('search-input')
const apiUrl = 'https://api.lyrics.ovh';

// function removeResult() {
//     $('.single-result').remove();
// }

// function suggestion() {
//     var term = input.value;
//     if(!term) {
//         removeResult();
//         return;
//     }
// }

// $.getJSON(apiUrl + '/suggest/' + term,function(data) {
//     removeResult();
//     var finalResults = [];
//     var seenResults = [];
//     data.data.foreach(function(result) {
//         if(seenResults.length >= 5) {
//             return;
//         }
//         seenResults.push(t);
//         finalResults.push({
//             display: t,
//             artist: result.artist.name,
//             title: result.title
//         });
//     });

// })
// search lyrics.json and filter it
const searchLyrics = async searchText => {
    const response = await fetch(apiUrl + '/suggest/' + input.value);
    const lyrics = await response.json();
    const Lyrics = lyrics.data;
    console.log(Lyrics);


};

//show result in html
const outputHtml = Lyrics => {
    if(Lyrics.length > 0) {
        const html = Lyrics.map(
            `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${Lyrics[0].album.title}</h3>
                <p class="author lead">Album by <span>${Lyrics[0].artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`
        ).join();
    }
    document.getElementById('result').innerHTML = html;
    document.getElementsByClassName('single-lyrics').style.display = "none";
};





input.addEventListener("input", () => searchLyrics());

searchButton.addEventListener("click", function() {
    document.querySelector('.lyrics-div').style.display = "block";
});
function displayBlock() {
    document.querySelector('.single-lyrics').style.display = "block";
};

/* searchButton.addEventListener('click',function(){
    fetch("https://api.lyrics.ovh/suggest/summer")
.then(res => res.json())
.then(data => (e){


})

.catch(error=> console.log("api is not working"));

}) */