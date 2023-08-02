// Div with a class of "overview"
const overview = document.querySelector(".overview");

// My Github username!
const username = "ruthiedr";

// ul that displays the repos list
const repoList = document.querySelector(".repo-list");

// Fetch Github API
const github = async function () {
    const githubInfo = await fetch(`https://api.github.com/users/${username}`);
    const getGithubInfo = await githubInfo.json();
    //console.log(getGithubInfo);
    displayFetchedInfo(getGithubInfo);
};

github();

// Display user info
const displayFetchedInfo = function (getGithubInfo) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${getGithubInfo.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${getGithubInfo.name}</p>
    <p><strong>Bio:</strong> ${getGithubInfo.bio}</p>
    <p><strong>Location:</strong> ${getGithubInfo.location}</p>
    <p><strong>Number of public repos:</strong> ${getGithubInfo.public_repos}</p>
  </div> `;

  overview.append(div);
  gitRepos();
};

// Fetch repos info
const gitRepos = async function() {
    const reposInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const getReposInfo = await reposInfo.json();
    //console.log(getReposInfo);
    displayRepoInfo(getReposInfo);
};

//gitRepos();

// Display info about repos
const displayRepoInfo = function(repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};