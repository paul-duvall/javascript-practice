// Form blur event listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

// Function to valdate name
function validateName() {
  const name = document.getElementById('name');
  // Regular expression checks to see if the name is between 2 and 10 characters long (and only letters)
  const re = /^[a-zA-Z]{2,10}$/;

  if(!re.test(name.value)){
    name.classList.add('is-invalid');
  } else {
    name.classList.remove('is-invalid');
  }
}

// Function to validate zip code
function validateZip() {
  const zip = document.getElementById('zip');
  // Regular expression checks to see if the zip code has either 5 numeric characters OR 5 numeric characters followed by a dash and four additional numeric characters
  const re = /^[0-9]{5}(-[0-9]{4})?$/;

  if(!re.test(zip.value)){
    zip.classList.add('is-invalid');
  } else {
    zip.classList.remove('is-invalid');
  }
}

// Function to validate email address
function validateEmail() {
  const email = document.getElementById('email');
  // Regular expression looks for a group of letters, numbers and dashs / underscores, followed by @, followed by another group, followed by a dot, followed by a group of between 2 and 5 non-numeric characters
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if(!re.test(email.value)){
    email.classList.add('is-invalid');
  } else {
    email.classList.remove('is-invalid');
  }
}

// Function to valide phone number
function validatePhone() {
  const phone = document.getElementById('phone');
  // Regular expression that looks for a group of three digits, a second group of three digits and a final group of four digits
  // Works with or without brackets around the first set of digits
  // Each group can continue straight on from the previous, or be separated by a space, a dot or a dash
  const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

  if(!re.test(phone.value)){
    phone.classList.add('is-invalid');
  } else {
    phone.classList.remove('is-invalid');
  }
}