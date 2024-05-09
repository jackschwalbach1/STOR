// Declare a global variable
var globalFoodData;

async function loadAndUseFoodData() { //loads the json file
  try {
    const response = await fetch('./js/data.json');
    globalFoodData = await response.json();
    console.log('Food data loaded:', globalFoodData);
  } catch (error) {
    console.error('Error loading the JSON data:', error);
  }
}

loadAndUseFoodData();


function displayResults(foodItems) { // displays search results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (foodItems.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const uniqueNames = new Set(); // Create a set to track unique item names
    const ul = document.createElement('ul');

    foodItems.forEach(item => {
        if (!uniqueNames.has(item.Name)) { // Check if the name has not been added yet
            const li = document.createElement('li');
            li.textContent = item.Name;
            li.addEventListener('click', function() {
               displayDetails(item.ID); // Pass the text content of the li
            });
            ul.appendChild(li);
            uniqueNames.add(item.Name); // Add name to the set
        }
    });

    resultsContainer.appendChild(ul);
}


function searchFood(){ //search json file for input
    loadAndUseFoodData();
    //console.log(globalFoodData[0].Name)
    const searchInput = document.getElementById('search-input').value;
    const normalizedInput = searchInput.toLowerCase();
    const result = globalFoodData.filter(item => item.Name.toLowerCase().includes(normalizedInput));

    displayResults(result);
}


function displayDetails(food_ID){ // displays food details
    const detailsContainer = document.getElementById('results');
    detailsContainer.innerHTML = ''; // Clear previous results

    const clicked_food_array = globalFoodData.filter(item => item.ID == food_ID);
    const clicked_food = clicked_food_array[0];
    const similar_foods = globalFoodData.filter(item => item.Name == clicked_food.Name);

    if(similar_foods.length == 1) {
        displaySTORinfo(similar_foods[0].ID);
        return;
    }

    const ul = document.createElement('ul');


    similar_foods.forEach(item =>{
        const li = document.createElement('li');
        li.textContent = item.Subtitle;
        li.addEventListener('click', function() {
            displaySTORinfo(item.ID); // Pass the id 
         });
        ul.appendChild(li);
    });

    detailsContainer.appendChild(ul);
}



function displaySTORinfo(food_ID){ //display information about storing
    const infoContainer = document.getElementById('results');
    infoContainer.innerHTML = ''; // Clear previous results

    const result = globalFoodData.filter(item => item.ID == food_ID);

    const food = result[0];


    if(food.Pantry_Metric != 'NR'){
        const pan_div = document.createElement('div');
        pan_div.style.backgroundColor = '#edc195';
        pan_div.innerHTML = food.Pantry_Min + "-" + food.Pantry_Max + " " + food.Pantry_Metric;
        const img = document.createElement('img');
        img.src = '';

        infoContainer.appendChild(pan_div);
    }
    if(food.Refrigerate_Metric != 'NR'){
        const fridge_div = document.createElement('div');
        fridge_div.style.backgroundColor = '#5ee5f7';
        fridge_div.innerHTML = food.Refrigerate_Min + "-" + food.Refrigerate_Max + " " + food.Refrigerate_Metric;
        const img = document.createElement('img');
        img.src = '';

        infoContainer.appendChild(fridge_div);
    }
    if(food.Freeze_Metric != 'NR'){
        const freeze_div = document.createElement('div');
        freeze_div.style.backgroundColor = '#2b2999';
        freeze_div.innerHTML = food.Freeze_Min + "-" + food.Freeze_Max + " " + food.Freeze_Metric;
        const img = document.createElement('img');
        img.src = '';

        infoContainer.appendChild(freeze_div);
    }
    if(food.Tip != null){
        const tip_div = document.createElement('div');
        tip_div.style.backgroundColor = '#bf2026';

        const tip_title = document.createElement('h3');
        tip_title.innerHTML = "Pro Tip";
        tip_title.style.color = "yellow";
        tip_title.style.textAlign = "center";
        tip_div.appendChild(tip_title);

        const tip = document.createElement('p')
        tip.innerHTML = food.Tip;
        tip_div.appendChild(tip);

        infoContainer.appendChild(tip_div);
    }
   
    
    
}