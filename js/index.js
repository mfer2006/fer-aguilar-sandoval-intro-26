
let today = new Date();
let thisYear = today.getFullYear();

const footer = document.createElement('footer');

let copyRight = document.createElement('p');
copyRight.innerHTML = `&copy; ${thisYear} Maria Fernanda Aguilar Sandoval`;
footer.appendChild(copyRight);
document.body.appendChild(footer);


let skills = ['HTML','R', 'Jamovi' , 'CSS', 'JavaScript', 'Git', 'GitHub']; 
let skillsSection = document.getElementById('skills'); 
let skillsList = skillsSection.querySelector('ul'); 

for ( let i= 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

let messageForm = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let usersName = event.target.usersName.value;
    let usersEmail = event.target.usersEmail.value;
    let usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    let messageSection = document.getElementById('messages');
    let messageList = messageSection.querySelector('ul');

    let newMessage = document.createElement('li');

    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a>
    <span>wrote: ${usersMessage}</span>`;

    let removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.addEventListener('click', function(event) {
        let entry = event.target.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    event.target.reset();
});

let projectSection = document.getElementById('projects');
let projectList = projectSection.querySelector('ul');

fetch('https://api.github.com/users/mfer2006/repos')
  .then(response => response.json())
  .then(data => {
    let repositories = data;
    console.log(repositories);

    for (let i = 0; i < repositories.length; i++) {
      let project = document.createElement('li');
      project.innerText = repositories[i].name;
      projectList.appendChild(project);
    }
  })
  .catch(error => {
    console.error('Error fetching repositories:', error);
  });
