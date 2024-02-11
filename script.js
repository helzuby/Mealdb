let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let userInput = document.getElementById('user-input');
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Add EventListener to the search button
searchBtn.addEventListener("click", searchMeal);

function searchMeal() {
    const searchTerm = userInput.value.trim();

    if (searchTerm !== "") {
        fetch(url + searchTerm)
        .then(response => response.json())
        .then(data => {
            displayMeal(data.meals[0]);
        })
        .catch(error => {
            console.error('Error:', error);
            result.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
        });
    } else {
        result.innerHTML = '<p>Please enter a meal name.</p>';
    }
}

function displayMeal(meal) {
    if (meal) {
        result.innerHTML = `
            <div class="meal">
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${getIngredients(meal)}
                </ul>
                <p><strong>Instructions:</strong></p>
                <ol>
                    ${getInstructions(meal)}
                </ol>
                <p><strong>YouTube Link:</strong></p>
                <a href="${meal.strYoutube}">${meal.strMeal}</a>
            </div>
        `;
    } else {
        result.innerHTML = '<p>No meal found. Please try again.</p>';
    }
}
// to show list of ingredients 
function getIngredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        } else {
            break;
        }
    }
    return ingredients;
}
//function to get procedure for meal preparation
function getInstructions(meal) {
    let instructions = '';
    meal.strInstructions.split('\n').forEach(instruction => {
        if (instruction.trim() !== "") {
            instructions += `<li>${instruction.trim()}</li>`;
        }
    });
    return instructions;
}

                   
            