qwerty();
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.searchBut');

    searchInput.focus();
    searchInput.setAttribute('autocomplete', 'off');

    searchButton.addEventListener('click', function() {
        searchBooks(searchInput);
    });

    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchBooks(searchInput);
        }
    });
});

function searchBooks(searchInput) {
    const url = `http://openlibrary.org/search.json?q=${encodeURIComponent(searchInput.value)}`;
    fetch(url)
    .then(response => response.json())
        .then(data => {
            let cardsContainer = document.querySelector('.cards');
            cardsContainer.innerHTML = '';
            console.log(data)
            if (data.docs && data.docs.length > 0) {
                data.docs.forEach(item => {
                    let card = document.createElement('div');
                    const title = item.title || '';
                    const authors = item.author_name ? item.author_name.join(', ') : '';
                    const firstEdition = item.first_publish_year || '';
                    const coverId = item.cover_i;
                    const imageLink = coverId ? `http://covers.openlibrary.org/b/id/${coverId}-S.jpg` : '';
                    let category = item.subject ? item.subject[0] : ''; 
                    if (category) {
                        let words = category.split(' ');
                        if (words.length > 4) {
                            category = words.slice(0, 4).join(' ') + '...';
                        }
                    }
                    card.innerHTML = `
                        <div class="card">
                            <div>
                                <p class="bookname">${title}</p>
                                <img src="${imageLink}" alt="${title}" class="cover">
                                <p class="first-edition">${firstEdition}</p>
                                <p class="authors">${authors}</p>
                                <p class="category">${category}</p>
                            </div>
                        </div>
                    `;
                    cardsContainer.appendChild(card);
                });
            } else {
                cardsContainer.innerHTML = '<p>No results found.</p>';
            }
        });
}


function qwerty(){
    const url = `http://openlibrary.org/search.json?q=сказки`;
    fetch(url)
    .then(response => response.json())
        .then(data => {
            let cardsContainer = document.querySelector('.cards');
            cardsContainer.innerHTML = '';
            console.log(data)
            if (data.docs && data.docs.length > 0) {
                data.docs.forEach(item => {
                    let card = document.createElement('div');
                    const title = item.title || '';
                    const authors = item.author_name ? item.author_name.join(', ') : '';
                    const firstEdition = item.first_publish_year || '';
                    const coverId = item.cover_i;
                    const imageLink = coverId ? `http://covers.openlibrary.org/b/id/${coverId}-S.jpg` : '';
                    let category = item.subject ? item.subject[0] : ''; 
                    if (category) {
                        let words = category.split(' ');
                        if (words.length > 4) {
                            category = words.slice(0, 4).join(' ') + '...';
                        }
                    }
                    card.innerHTML = `
                        <div class="card">
                            <div>
                                <p class="bookname">${title}</p>
                                <img src="${imageLink}" alt="${title}" class="cover">
                                <p class="first-edition">${firstEdition}</p>
                                <p class="authors">${authors}</p>
                                <p class="category">${category}</p> 
                            </div>
                        </div>
                    `;
                    cardsContainer.appendChild(card);
                });
            } else {
                cardsContainer.innerHTML = '<p>No results found.</p>';
            }
        });
}
const clear = document.querySelector('.input-button');
clear.addEventListener('click', function(){
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
})
