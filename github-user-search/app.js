// Need to instantiate the github class
const github = new Github;

// Need to instantiate the ui class
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  if(userText !== ''){
    // Make HTTP call
    github.getUser(userText)
    .then(data => {
      if(data.profile.message === 'Not Found') {
        // Show alert

      } else {
        // Show profile
        ui.showProfile(data.profile);
      }
    })
  } else {
    // Clear profile
  }

});