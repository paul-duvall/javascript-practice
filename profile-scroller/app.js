const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingfor: 'female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    name: 'Boris Bugspray',
    age: 22,
    gender: 'male',
    lookingfor: 'male',
    location: 'New York NY',
    image: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  {
    name: 'Lucy Leggings',
    age: 26,
    gender: 'female',
    lookingfor: 'male',
    location: 'Florida FL',
    image: 'https://randomuser.me/api/portraits/women/55.jpg'
  },
  {
    name: 'Nancy Nutbar',
    age: 38,
    gender: 'female',
    lookingfor: 'female',
    location: 'Florida FL',
    image: 'https://randomuser.me/api/portraits/women/53.jpg'
  },
];

// Generator current profile
const profiles = profileIterator(data);

// Call first profile (to be displayed on load)
nextProfile();

// Next event (occurs on button click)
document.getElementById('next').addEventListener('click', nextProfile);

// Function to display the next profile
function nextProfile(){
  const currentProfile = profiles.next().value;
  
  if(currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Name: ${currentProfile.name}</li>
      <li class="list-group-item">Age: ${currentProfile.age}</li>
      <li class="list-group-item">Location: ${currentProfile.location}</li>
      <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
    </ul>
    `;

    document.getElementById('imageDisplay').innerHTML = `
      <img src="${currentProfile.image}">
    `;
  } else {
    // No more profiles
    window.location.reload();
  }
}

// Profile iterator
function profileIterator(profiles){
  let nextIndex = 0;
  
  return {
    next: function() {
      return nextIndex < profiles.length ?
      { value: profiles[nextIndex++], done: false} :
      { done: true }
    }
  };
}