// Listen for a click on the random quote button
document.getElementById('randomTrumpButton').addEventListener('click', getRandomQuote);

// Listen for a click on the personalised quote button
document.getElementById('personalisedTrumpButton').addEventListener('click', getPersonalisedQuote);

// Listen for blur event on input field
let userInput;
document.getElementById('personalisedText').addEventListener('blur', getName);


// Gets the name inputed for use in quote
function getName(){
  userInput = document.getElementById('personalisedText').value;  
}

function getRandomQuote(e) {
  
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'https://api.whatdoestrumpthink.com/api/v1/quotes/random', true);
  
  xhr.onload = function() {
    
    if(this.status === 200){
      const response = JSON.parse(this.responseText);
      console.log(response);
      document.querySelector('.trumpWords').innerHTML = response.message;   
    }
  }
  xhr.send();
  e.preventDefault();
}



function getPersonalisedQuote(e) {
  
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', `https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${userInput}`, true);
  
  xhr.onload = function() {
    
    if(this.status === 200){
      const response = JSON.parse(this.responseText);
      document.querySelector('.trumpWords').innerHTML = response.message;   
    }
  }
  xhr.send();
  e.preventDefault();
}