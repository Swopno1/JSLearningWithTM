class Github {
  constructor() {
    this.client_id = '7520b835bf36f66d68ad';
    this.client_secret = 'c5fb7bf9c29a4004128fe215960c972ebef37834';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return {
      profile,
      repos
    }
  }
}

// https://api.github.com/users/Swopno1?client_id=7520b835bf36f66d68ad&client_secret=c5fb7bf9c29a4004128fe215960c972ebef37834