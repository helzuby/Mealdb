let randomMealsButton = document.getElementById('randomMealsButton')
let mealContainer = document.getElementById('mealContainer')

// Add EventListener to the generate random meal button

randomMealsButton.addEventListener("click", () => {
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => {
        createMeal(response.data.meals[0]);
    })
    .catch(error => {
        console.log(error);
    });
});
 
        
function createMeal(meal) {
    if (meal) {
        mealContainer.innerHTML = `
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
        mealContainer.innerHTML = '<p>No meal found. Please try again.</p>';
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

                   
            