//these are to select and store references to two of the dom elements
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

//this is the array of the fruit names
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

//this is the search function it takes the string converts it to lowercase and uses the filter method to return a fruit array
function search(str) {
	let results = [];
	const find = str.toLowerCase();

	results = fruit.filter(fruitName => fruitName.toLowerCase().includes(find));

	return results;
}

//this function handles the input in the search bar, it gets the value and returns the result in the suggestion box
function searchHandler(e) {
	const inputValue = e.target.value.trim();
	const results = search(inputValue);
	showSuggestions(results, inputValue);
  }

//This function uses the results array and inputVal parameters it creates list items for each result and appends them to the suggestionList
function showSuggestions(results, inputVal) {
	const suggestionList = document.querySelector('.suggestions ul');
	suggestionList.innerHTML = '';
  
	if (inputVal === '') {
	  return;
	}
  
	results.forEach(result => {
	  const listItem = document.createElement('li');
	  listItem.textContent = result;
	  suggestionList.appendChild(listItem);
	});
  
	// Show the suggestions list
	suggestionList.classList.add('has-suggestions');
  }


  // this function handles when a user clicks on a suggestion, it moves the textContent of the suggestion to the searchbar
	function useSuggestion(e) {
		if (e.target.tagName === 'LI') {
		  input.value = e.target.textContent;
		}
	  
		const suggestionList = document.querySelector('.suggestions ul');
		suggestionList.innerHTML = '';
	  
		
	  }

//These are the two event listeners I used, the first one triggers the searchHandler function anytime someone types something in the searchbar to update and display the suggestions and the second one is triggered when someone clicks on a suggestion it calls the useSuggestion function to fill the search bar with the clicked suggestion.
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);