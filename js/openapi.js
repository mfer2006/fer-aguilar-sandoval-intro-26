let artpiecesButton = document.getElementById('artpiecesButton');
let artistsButton = document.getElementById('artistsButton');
let artworkResults = document.getElementById('artworkResults');
let artistResults = document.getElementById('artistResults');

let currentArtistId = null;


// ARTWORK BUTTON
artpiecesButton.addEventListener('click', function() {

    let randomPage = Math.floor(Math.random() * 100) + 1;

    fetch(`https://api.artic.edu/api/v1/artworks?limit=1&page=${randomPage}&fields=id,title,artist_id,artist_title,image_id`)
        .then(response => response.json())
        .then(data => {

            let artwork = data.data[0];

            currentArtistId = artwork.artist_id;

            let imageUrl =
                `${data.config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;

            artworkResults.innerHTML = `
                <img src="${imageUrl}" alt="${artwork.title}">
                <h3>${artwork.title}</h3>
                <p>${artwork.artist_title || 'Unknown artist'}</p>
            `;

            artistResults.innerHTML =
                '<p>Click "View Artist" to learn about this artist.</p>';
        })
        .catch(error => {
            console.error('Error fetching artwork:', error);
        });

});

// ARTIST BUTTON

artistsButton.addEventListener('click', function() {

    if (!currentArtistId) {
        artistResults.innerHTML =
            '<p>No artist information is available for this artwork:((</p>';
        return;
    }

    fetch(`https://api.artic.edu/api/v1/agents/${currentArtistId}`)
        .then(response => response.json())
        .then(data => {

            let artist = data.data;

            artistResults.innerHTML = `
                <h3>${artist.title}</h3>
                <p>Born: ${artist.birth_date || 'Sorry, no birth information available:('}</p>
                <p>Died: ${artist.death_date || 'Sorry, no death information available:('}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching artist:', error);

            artistResults.innerHTML =
                '<p>Sorry, artist information could not be loaded:,((</p>';
        });

});