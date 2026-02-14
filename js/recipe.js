const form = document.getElementById("searchForm");
const input = document.getElementById("recipeInput");
const resultContainer = document.getElementById("recipeResult");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) fetchRecipes(query);
});

async function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    resultContainer.innerHTML =
        '<div class="spinner-border text-info mx-auto d-block mt-5" role="status"><span class="visually-hidden">Loading...</span></div>';

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data)

        if (!data.meals) {
            resultContainer.innerHTML =
                '<p class="error-msg">Aucune recette trouvée</p>';
            return;
        }
        displayRecipes(data.meals);
    } catch (error) {
        resultContainer.innerHTML =
            '<p class="error-msg">Erreur de connexion</p>';
    }
}

function displayRecipes(meals) {
    let html = '<div class="row g-3">';

    meals.slice(0, 6).forEach((meal) => {
        html += `
                        <div class="col-12 col-md-6">
                            <div class="recipe-card" onclick="window.open('${meal.strYoutube}', '_blank')">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img">
                                <div class="recipe-body">
                                    <h5 class="recipe-title">${meal.strMeal}</h5>
                                    <p class="recipe-info mb-0">
                                        <span class="me-2">${meal.strCategory}</span>• 
                                        <span class="ms-2">${meal.strArea}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
    });

    html += "</div>";
    resultContainer.innerHTML = html;
}
