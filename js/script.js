// Div with a class of "overview"
const overview = document.querySelector(".overview");

// My Github username!
const username = "ruthiedr";

// ul that displays the repos list
const repoList = document.querySelector(".repo-list");

// Repos section
const reposSection = document.querySelector(".repos");

// Individual repo data section
const repoData = document.querySelector(".repo-data");

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

// Click event to call on repo names
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

// Calls for specific repo info
const specificRepoInfo = async function(repoName) {
    const getSpecificRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getSpecificRepoInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
    }
    displaySpecificInfo(repoInfo, languages);
};

// Displays the spicific repo info
const displaySpecificInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
   <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    
    
    repoData.append(infoDiv);
    
};



