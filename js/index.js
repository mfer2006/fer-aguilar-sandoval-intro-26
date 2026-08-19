
let today = new Date();
let thisYear = today.getFullYear();

const footer = document.querySelector('footer');

let copyRight = document.createElement('p');
copyRight.innerHTML = `&copy; ${thisYear} Maria Fernanda Aguilar Sandoval`;
document.body.appendChild(copyRight);


let skills = ['HTML','R', 'Jamovi' , 'CSS', 'JavaScript', 'Git', 'GitHub']; 
let skillsSection = document.getElementById('skills'); 
let skillsList = skillsSection.querySelector('ul'); 

for ( let i= 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}