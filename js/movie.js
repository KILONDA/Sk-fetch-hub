const form = document.getElementById('searchForm');
            const input = document.getElementById('videoInput');
            const resultContainer = document.getElementById('videoResult');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = input.value.trim();
                if (query) fetchVideos(query);
            });

            async function fetchVideos(query) {
                const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
                
                resultContainer.innerHTML = '<div class="spinner-border text-info mx-auto d-block mt-5" role="status"><span class="visually-hidden">Loading...</span></div>';

                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if (data.length === 0) {
                        resultContainer.innerHTML = '<p class="error-msg">Aucun résultat trouvé</p>';
                        return;
                    }
                    displayVideos(data);
                } catch (error) {
                    resultContainer.innerHTML = '<p class="error-msg">Erreur de connexion</p>';
                }
            }

            function displayVideos(shows) {
                let html = '<div class="row g-3">';
                
                shows.slice(0, 9).forEach(item => {
                    const show = item.show;
                    const image = show.image ? show.image.medium : 'https://via.placeholder.com/210x295/0d1b2a/4a7c9b?text=No+Image';
                    const rating = show.rating.average ? show.rating.average.toFixed(1) : 'N/A';
                    const genres = show.genres.length > 0 ? show.genres[0] : 'Inconnu';
                    
                    html += `
                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="movie-card h-100" onclick="window.open('${show.url}', '_blank')">
                                <img src="${image}" alt="${show.name}" class="movie-img">
                                <div class="movie-body">
                                    <h5 class="movie-title">${show.name}</h5>
                                    <div class="movie-info">
                                        <span>${genres}</span>
                                        <span class="movie-rating">${rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                html += '</div>';
                resultContainer.innerHTML = html;
            }