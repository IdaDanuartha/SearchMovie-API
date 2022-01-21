// LK21 Movie API
// https://api-lk21.herokuapp.com/pathname?parameter=value

/*
Data JSON
    Title
    Thumbnail
    Genre
    Rating
    Duration
    Quality
    Trailer
    Watch
*/

/*
Pathname
    newupload
    comingsoon
    tv
    year
    country
    genre
    search
*/

/*
Parameter
    page
    query
    country
    genre
    year
*/

function searchMovie()
{
    $('#movie-cards').html('')

    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'c4c518bc',
            's': $('#search-keyword').val()
        },
        success: results => {
            // console.log(results)
            if(results.Response == 'True') {
                let movies = results.Search
                console.log(movies)
                let content = ''
                $.each(movies, function(i, data) {
                    content += showMovies(data)
                })

                $('.movie-cards').html(content)
                $('.text-error').html('')
                
            } else {
                $('.movie-cards').html('')
                $('.text-error').html('Movie Not Found')
            }

            
        },
    })
}

function showMovies(data)
{
    return `<div class="flex justify-center">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
        <img class="rounded-t-lg" src="${data.Poster}" alt=""/>
      </a>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">${data.Title}</h5>
        <p class="text-gray-700 text-base mb-4">
        ${data.Type}
        </p>
        <button type="button" class="detail-film-btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalXl" data-imdbid="${data.imdbID}">Details Film</button>
      </div>
    </div>
  </div>`
}

function showModal(data)
{
    return `<div class="container">
        <div class="flex">
            <img class="rounded mr-3" src="${data.Poster}">
            <div class="">
                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Title: </p>
                    <span>${data.Title}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Type: </p>
                    <span>${data.Type}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Genre: </p>
                    <span>${data.Genre}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Country: </p>
                    <span>${data.Country}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Runtime: </p>
                    <span>${data.Runtime}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Released: </p>
                    <span>${data.Released}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Year: </p>
                    <span>${data.Year}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Rating: </p>
                    <span>${data.imdbRating}</span>
                </div>

                <div class="flex m-1.5">
                    <p class="font-semibold mr-1">Plot: </p>
                    <span>${data.Plot}</span>
                </div>

            </div>
        </div>
    </div>`
}


$('#search-btn').on('click', function() {
    searchMovie()
})

$('#search-keyword').on('keyup', function(e) {
    if(e.keyCode == 13) {
        searchMovie()
    }
})

$('.movie-cards').on('click', '.detail-film-btn', function() {
    
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'c4c518bc',
            'i': $(this).data('imdbid')
        },
        success: results => {
            console.log(results)
            $('.modal-body').html(showModal(results))
        }
    })
})


