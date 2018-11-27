const ul = document.getElementById('authors'); // Get list element where user details will be placed
const url = 'https://randomuser.me/api/?results=10'; // URL from the randomuser.me API

// Helper functions
function createNode(element){
  return document.createElement(element); // Create the given type of element
}

function append(parent, el){
  return parent.appendChild(el); // Appends second parameter (the element) to the first parameter
}

// fetch used to access the API
fetch(url)
  // .json() method used to generate JSON data
  .then(resp => resp.json())
  .then(function(data) {
    let authors = data.results
    return authors.map(function(author) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = author.picture.medium;
      span.innerHTML = `${author.name.first} ${author.name.last}`;
      append(li, img);
      append(li, span);
      append(ul, li);

    })
  }) 
  .catch(function(error) {
    console.log(error);
  });