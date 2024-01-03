
const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");


// function to get recips
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes... </h2>";
    try{

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // console.log(response.meals[0]);

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        // console.log(meal);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3> ${meal.strMeal}</h3>
        <p> <span> ${meal.strArea} </span> Dish </p>
        <p> Category: <span> ${meal.strCategory} </span> </p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";

        recipeDiv.appendChild(button);

        // Adding Event Listner to Recipe Button

        button.addEventListener('click', () => {
            openRecipePopup(meal);

        })

        recipeContainer.appendChild(recipeDiv);
    });

    recipeContainer.style.display = `grid`;
    }
    catch(error){
        recipeContainer.innerHTML = "<img src='./images/error-48261.png' style='width:150px'> ";
        recipeContainer.innerHTML += "<h2> Error in fetching recipes. </h2>";
        recipeContainer.innerHTML += "<h3> There is no such recipe. </h3>";
        // recipeContainer.style.display="block";
        recipeContainer.style.display = `block`;

    }


}

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName"> ${meal.strMeal} </h2>
        <h3> Ingredients: </h3>
        <ul class="ingredientList"> ${fetchIngredients(meal)} </ul>

        <div class="recipeInstructions">
            <h3> Instructions: </h3>
            <p> ${meal.strInstructions}</p>
        </div>
    `



    recipeDetailsContent.parentElement.style.display = "block";
}


recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();

    if(!searchInput){
        recipeContainer.innerHTML = `<h2> Type the meal in the search box. </h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

