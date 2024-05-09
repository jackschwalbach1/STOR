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
    console.log(result);
    displayResults(result);
}


function displayDetails(){ // displays food details
    
}