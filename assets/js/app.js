const cl =console.log;

const baseUrl = `https://api.github.com/users`;

const userNameForm =document.getElementById('userNameForm');
const userNameControl =document.getElementById('userNameControl');
const main =document.getElementById("main")

const makeApiCall =async(apiUrl)=>{
    try{
        const res =await fetch(apiUrl)
      return await res.json()
    }catch(error){
        throw error;
    }
}

const userCard = (user) => {
    let id = user.name || user.login;
    let info = user.bio ? `<p>${user.bio}</p>` : "";
    
    const cardElement = `
       <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${id}</h2>${info}
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>`;
    
    main.innerHTML = cardElement;
};

const repoCardFunction = (repos) => {
    let reposElement = document.getElementById("repos");
    reposElement.innerHTML = "";  
    for (let i = 0; i < 5 && i < repos.length; i++) {
        let repo = repos[i];
        let repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposElement.appendChild(repoEl);
    }
};

const onSubmit =async(eve)=>{
    try{
        eve.preventDefault()
        let username =userNameControl.value;
    
        let userUrl =`${baseUrl}/${username}`;
        let userRepoUrl =`${baseUrl}/${username}/repos`;
    
        let arrOfprom =[makeApiCall(userUrl),makeApiCall(userRepoUrl)]
    
        let[userData, userRepos]=await Promise.all(arrOfprom)
        
        
        userCard(userData);
        repoCardFunction(userRepos)
    }catch (error) {
        cl(err,"error")
    }
   
    


}

userNameForm.addEventListener('submit',onSubmit)



