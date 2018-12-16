import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for button click to add a post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for icon click to delete a post
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for icon click to edit a post and enable edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for button click to cancel edit state
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get the posts and display in the DOM
function getPosts() {
  http.get('http://localhost:3000/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}

// Submit post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Validate input
  if(title === '' || body === '') {
    ui.showAlert('Please complete all fields', 'alert alert-danger');

    
  } else {

    // Check for ID (if present, this is an update, if not, this is a new post)
    if(id === ''){
      // Create post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }

  }
}

function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
          .then(data => {
            ui.showAlert('Post Removed', 'alert alert-success');
            getPosts();
          })
          .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

// Enable edit state
function enableEdit(e) {  
  if(e.target.parentElement.classList.contains('edit')) {
    // Get the id, title and body of the post that is to be edited
    const id = e.target.parentElement.dataset.id
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    // Add the id, title and body to a data object
    const data = {
      id,
      title,
      body
    }

    // Fill form with current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel edit state
function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}