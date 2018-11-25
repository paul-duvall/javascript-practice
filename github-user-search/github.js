class Github {
  constructor() {
    this.client_id = '9be118bd0629f123304a';
    this.client_secret = 'ba65cda75969028fc7b3d6e18c5363f4a22999ea';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    // Define variable containing API for user
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    // Define variable containing API for user's repos
    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    // Define variable containing the data from the API
    const profile = await profileResponse.json();

    // Define variable containing the data from the API for repos
    const repos = await repoResponse.json();

    // Return an object containing the data (note that only 'profile' is needed - will set key to 'profile' and the value to the content of the profile variable)
    return {
      profile,
      repos
    }
  }
}