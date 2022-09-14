document.addEventListener('DOMContentLoaded', event =>{
    const githubForm = document.getElementById('github-form')
    githubForm.addEventListener('submit', handleSubmit)
    
    function handleSubmit(event){
        event.preventDefault();
        const searchWord = event.target.querySelector('#search').value

        fetch(`https://api.github.com/search/users?q=${searchWord}`)
        .then(result => result.json())
        .then(githubUsers => {
            for(user in githubUsers.items){
                const domUserList = document.getElementById('user-list')
                domUserList.style.height = "700px"
                domUserList.style.overflowY = "scroll"
                const domUser = document.createElement('li')
                domUser.innerHTML = `<div>
                    <img src="${githubUsers.items[user].avatar_url}" width="100px" height="100px"/>
                    <div class="github-user" style="cursor:pointer">${githubUsers.items[user].login}</div>
                    <a href="${githubUsers.items[user].html_url}" target="_blank">view user on github</a>
                </div>`  
                domUser.style.marginBottom = "20px"
                domUser.style.marginTop = "20px"

                domUserList.append(domUser)

                handleClickOnUserName(document.querySelectorAll('.github-user'))
            }
        })
    }

    function makeActive(domUsers, domUser){
        domUsers.forEach(user =>{
            if(domUser != user){
                user.parentNode.style.border = "none"
            }else{
                user.parentNode.style.border = "0.2em red solid"
            }
        })
    }

    function handleClickOnUserName(domUsers){
        domUsers.forEach(domUser =>{
            domUser.addEventListener('click', event =>{
                fetch(`https://api.github.com/users/${domUser.textContent}/repos`)
                .then(result => result.json())
                .then(repos => {
                    const reposList = document.getElementById('repos-list')
                    reposList.style.height = "700px"
                    reposList.style.overflowY = "scroll"
                    reposList.innerHTML = ""
                    repos.forEach(repo =>{
                        const repoItem = document.createElement('li')
                        repoItem.textContent = repo.name
                        reposList.append(repoItem)
                    })

                    makeActive(domUsers, domUser)
                })
            })
        })
    }
})