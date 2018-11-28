const parentDiv = document.getElementById('authors'); // Get list element where user details will be placed
const url = 'https://randomuser.me/api/?results=6'; // URL from the randomuser.me API

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
    console.log(authors);
    return authors.map(function(author) {
      let div = createNode('div'),
          span = createNode('span'),
          name = author.name.first.toUpperCase() + " " + author.name.last.toUpperCase();
      span.innerHTML = 
      `
      <div class="authorContainer">
        
        <div><img src="${author.picture.large}"> </div>
        <div>${name}</div>
        <div><strong>Age:</strong> ${author.dob.age}</div>
        <div><strong>Gender:</strong> ${author.gender}</div>
        <div class="authorText">Hello hello hello hello hello hello hello hello hello</div>

      </div>
      `;
      append(div, span);
      append(parentDiv, div);

    })
  }) 
  .catch(function(error) {
    console.log(error);
  });



  // This is some information about this interesting person. They are super interesting. They made cool stuff. Oooooooh! No you can't see it...but it is totally cool and, if you saw it, you'd be super impressed.