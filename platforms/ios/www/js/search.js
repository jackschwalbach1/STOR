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
    const detailsContainer = document.getElementById('foodDetails');
    resultsContainer.innerHTML = ''; // Clear previous results
    detailsContainer.innerHTML = '';

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
               displayDetails(this.textContent); // Pass the text content of the li
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
    const result = globalFoodData.filter(item => item.Name.toLowerCase().includes(normalizedInput) || item.Subtitle.toLowerCase().includes(normalizedInput));

    displayResults(result);
}


function displayDetails(input){ // displays food details
    const detailsContainer = document.getElementById('results');
    detailsContainer.innerHTML = ''; // Clear previous results

    const normalizedInput = input.toLowerCase();
    const __result = globalFoodData.filter(item => item.Name.toLowerCase().includes(normalizedInput));
    const _result = __result.filter(item => item.Subtitle.toLowerCase() != null);
    const result = _result.filter(item => item.Subtitle.toLowerCase() != 'na')

    const ul = document.createElement('ul');

    result.forEach(item =>{
        const li = document.createElement('li');
        li.textContent = item.Subtitle;
        ul.appendChild(li);
    });

    detailsContainer.appendChild(ul);
}
