const url = './data/members.json';

// Adds members to HTML
function displayMembers(members){
    const cards = document.querySelector('#members');
        // Iterates through each member in JSON list
        members.forEach((member) =>{
            let section = document.createElement('section')
            section.classList.add('directoryCard');
            // Card HTML format
            let sectionHTML = `
            <img src="${member.imageFile}" alt="${member.name}"></img>
            <div class=directoryCardText>
            <h2>${member.name}</h2>
            <h3>${member.membershipLevel}</h3>
            <p>${member.address}</p>
            <p>${member.phoneNumber}</p>
            <a href="${member.websiteURL}">Website</a>
            </div>`;
        
        // Adds format to the cards
        section.innerHTML = sectionHTML;
        cards.appendChild(section);
    });
}

// Grabs member data from JSON file
async function getMemberData(){
    const response = await fetch(url)
    if (response.ok){
        const data = await response.json();
        displayMembers(data.members)
    }
}

getMemberData();

// Grid & List
const gridButton = document.getElementById('displayGrid');
const listButton = document.getElementById('displayList');
const container = document.querySelector('#members')

gridButton.addEventListener('click', ()=>{
    // Checks if grid is active
    if(gridButton.classList.contains('inactive')){
        
        gridButton.classList.replace('inactive','active')

        listButton.classList.replace('active','inactive')

        container.classList.replace('list','grid')
    }
    
});

listButton.addEventListener('click', () => {
    // Checks if list is active
    if(listButton.classList.contains('inactive')){
        
        listButton.classList.replace('inactive','active');

        gridButton.classList.replace('active','inactive');
        
        container.classList.replace('grid','list');
    }
});