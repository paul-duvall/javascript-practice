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
          firstName = author.name.first.toUpperCase(),
          lastName = author.name.last.toUpperCase();
      div.innerHTML = 
      `
      <div class="authorContainer">
        <div class="leftAuthorColumn">
          <div><img src="${author.picture.large}"> </div>
          <div class="authorName">
            <div>${firstName}</div>
            <div>${lastName}</div>
          </div>
          <div><strong>Age:</strong> ${author.dob.age}</div>
          <div><strong>Gender:</strong> ${author.gender}</div>
        </div>
        <div class="rightAuthorColumn">
          <div class="authorText">Meet this person. They are great. Once, they built this website and everyone was incredibly impressed. Really, it blew the collective minds of all the people who saw it. If you saw it, you'd love it immediately.</div>
          <span class="icons">
          <a href="#"><i class="fas fa-envelope-square"></i></a>
          <a href="#"><i class="fas fa-phone-square"></i></a>
          <a href="#"><i class="fab fa-twitter-square"></i></a>
          <a href="#"><i class="fab fa-facebook-square"></i></a>
          </span>
        </div>
      </div>
      `;
      append(parentDiv, div);

    })
  }) 
  .catch(function(error) {
    console.log(error);
  });



  // This is some information about this interesting person. They are super interesting. They made cool stuff. Oooooooh! No you can't see it...but it is totally cool and, if you saw it, you'd be super impressed.