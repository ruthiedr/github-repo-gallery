// Div with a class of "overview"
const overview = document.querySelector(".overview");

// My Github username!
const username = "ruthiedr";

const github = async function () {
    const githubInfo = await fetch(`https://api.github.com/users/${username}`);
    const getGithubInfo = await githubInfo.json();
    console.log(getGithubInfo);
    displayFetchedInfo(getGithubInfo);
};

github();

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
};