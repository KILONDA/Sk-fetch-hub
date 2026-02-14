const form = document.getElementById('searchForm');
            const input = document.getElementById('bookInput');
            const resultContainer = document.getElementById('bookResult');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = input.value.trim();
                if (query) fetchBooks(query);
            });

            async function fetchBooks(query) {
                const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`;
                
                resultContainer.innerHTML = '<div class="spinner-border text-info mx-auto d-block mt-5" role="status"><span class="visually-hidden">Loading...</span></div>';

                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if (!data.items || data.items.length === 0) {
                        resultContainer.innerHTML = '<p class="error-msg">Aucun livre trouvé</p>';
                        return;
                    }
                    displayBooks(data.items);
                } catch (error) {
                    resultContainer.innerHTML = '<p class="error-msg">Erreur de connexion</p>';
                }
            }

            function displayBooks(books) {
                let html = '<div class="row g-3">';
                
                books.forEach(item => {
                    const info = item.volumeInfo;
                    const image = info.imageLinks ? info.imageLinks.thumbnail.replace('http:', 'https:') : null;
                    const title = info.title || 'Titre inconnu';
                    const authors = info.authors ? info.authors[0] : 'Auteur inconnu';
                    const year = info.publishedDate ? info.publishedDate.substring(0, 4) : '';
                    const link = info.infoLink || '#';
                    
                    html += `
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="book-card h-100" onclick="window.open('${link}', '_blank')">
                                <div class="book-img-container">
                                    ${image 
                                        ? `<img src="${image}" alt="${title}" class="book-img">` 
                                        : `<span class="material-symbols-outlined" style="font-size: 48px; color: #4a7c9b;">menu_book</span>`
                                    }
                                </div>
                                <div class="book-body">
                                    <h5 class="book-title">${title}</h5>
                                    <p class="book-author">${authors}</p>
                                    <p class="book-info mb-0">${year}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                html += '</div>';
                resultContainer.innerHTML = html;
            }