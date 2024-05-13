// Declare a global variable
let globalFoodData;

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
    let resultsContainer = document.getElementById('results');
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
    //loadAndUseFoodData();
    //console.log(globalFoodData[0].Name)
    const searchInput = document.getElementById('search-input').value;
    const normalizedInput = searchInput.toLowerCase();
    const result = globalFoodData.filter(item => item.Name.toLowerCase().includes(normalizedInput));

    displayResults(result);
}


function displayDetails(food_ID){ // displays food details
    let detailsContainer = document.getElementById('results');
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
    let infoContainer = document.getElementById('results');
    infoContainer.innerHTML = ''; // Clear previous results

    const result = globalFoodData.filter(item => item.ID == food_ID);

    let food = result[0];

    let name = document.createElement('h2');
    name.innerHTML = food.Name;
    name.style.color = 'black';
    name.style.textAlign = 'center';
    infoContainer.appendChild(name);


    if(food.Pantry_Metric != 'NR'){
        let pan_div = document.createElement('div');
        pan_div.style.backgroundColor = '#edc195';
        if(food.Pantry_Min == food.Pantry_Max){
            if(food.Pantry_Max == 1){
                new_metric = food.Pantry_Metric.slice(0,-1);
                pan_div.innerHTML = food.Pantry_Min + " " + new_metric;
            }
            else{
                pan_div.innerHTML = food.Pantry_Min + " " + food.Pantry_Metric;
            }
        }
        else{
            pan_div.innerHTML = food.Pantry_Min + "-" + food.Pantry_Max + " " + food.Pantry_Metric;
        }
        let img = document.createElement('img');
        img.src = './img/pantry_icon.png';
        img.width = 100;
        pan_div.appendChild(img);

        infoContainer.appendChild(pan_div);
    }
    if(food.Refrigerate_Metric != 'NR'){
        let fridge_div = document.createElement('div');
        fridge_div.style.backgroundColor = '#5ee5f7';
        if(food.Refrigerate_Min == food.Refrigerate_Max){
            if(food.Refrigerate_Max == 1){
                new_metric = food.Refrigerate_Max.slice(0,-1);
                fridge_div.innerHTML = food.Refrigerate_Min + " " + new_metric;
            }
            else{
                fridge_div.innerHTML = food.Refrigerate_Min + " " + food.Refrigerate_Metric;
            }
        }
        else{
            fridge_div.innerHTML = food.Refrigerate_Min + "-" + food.Refrigerate_Max + " " + food.Refrigerate_Metric;
        }
        let img = document.createElement('img');
        img.src = './img/fridge_icon.png';
        img.width = 100;
        fridge_div.appendChild(img);
        

        infoContainer.appendChild(fridge_div);
    }
    if(food.Freeze_Metric != 'NR'){
        let freeze_div = document.createElement('div');
        freeze_div.style.backgroundColor = '#2b2999';
        if(food.Freeze_Min == food.Freeze_Max){
            if(food.Freeze_Max == 1){
                new_metric = food.Freeze_Max.slice(0,-1);
                freeze_div.innerHTML = food.Freeze_Max + " " + new_metric;
            }
            else{
                freeze_div.innerHTML = food.Freeze_Max + " " + food.Refrigerate_Metric;
            }
        }
        else{
            freeze_div.innerHTML = food.Freeze_Min + "-" + food.Freeze_Max + " " + food.Freeze_Metric;
        }
        let img = document.createElement('img');
        img.src = './img/fridge_icon.png';
        img.width = 100;
        freeze_div.appendChild(img);

        let img_s = document.createElement('img');
        img_s.src = './img/snowflake.png';
        img_s.width = 50;
        freeze_div.appendChild(img_s);
       

        infoContainer.appendChild(freeze_div);
    }
    if(food.Tip != null){
        let tip_div = document.createElement('div');
        tip_div.style.backgroundColor = '#bf2026';

        let tip_title = document.createElement('h3');
        tip_title.innerHTML = "Pro Tip";
        tip_title.style.color = "yellow";
        tip_title.style.textAlign = "center";
        tip_div.appendChild(tip_title);

        let tip = document.createElement('p')
        tip.innerHTML = food.Tip;
        tip_div.appendChild(tip);

        infoContainer.appendChild(tip_div);
    }
   
    
    
}