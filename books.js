document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.searchBut');

    searchInput.focus();
    searchInput.setAttribute('autocomplete', 'off');

    searchButton.addEventListener('click', function() {
        searchBooks();
    });

    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchBooks();
        }
    });
});

function searchBooks() {
    const searchQuery = document.getElementById('search-input').value;
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + searchQuery + '&key=AIzaSyC05Ww6RmgFhpq6OA7d9pYyXLGSjLNR9EM')
        .then(response => response.json())
        .then(data => {
            let resultsHTML = '';
            if (data.items) {
                data.items.forEach(item => {
                    const title = item.volumeInfo.title;
                    const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : '';
                    const imageLink = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : '';
                    const category = item.volumeInfo.categories ? item.volumeInfo.categories[0] : '';
                    resultsHTML += `
                        <div class="card">
                            <div>
                                <p class="bookname">${title}</p>
                                <img src="${imageLink}" alt="${title}" class="cover">
                                <p class="categories">${category}</p>
                                <p class="authors">${authors}</p>
                            </div>
                        </div>
                    `;
                });
            } else {
                resultsHTML = '<p>No results found.</p>';
            }
            document.querySelector('.cards').innerHTML = resultsHTML;
        });
}

document.querySelector('.searchBut').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').placeholder = 'Input book name';
});
