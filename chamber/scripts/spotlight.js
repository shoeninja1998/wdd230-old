let dataFile = './data/members.json';

const spotlight = document.querySelector('.spotlight');

function GetData(members){
    members.forEach(member => {
        let section = document.createElement('section');
        // HTML format
        let sectionHTML = `
            <img src="${member.imageFile}" alt="${member.name}">
            <h3>${member.name}</h3>
            <ul>
                <li>${member.membershipLevel} </li>
                <li>${member.address} </li>
                <li>${member.phoneNumber}</li>
            </ul>
        `;
        section.innerHTML = sectionHTML;
        spotlight.appendChild(section);
    });
}

function GetSpotlight(data){
    let members = [];
    // Selects members that are Gold or Silver
    data.members.forEach(member =>{
        if(member.membershipLevel == 'Silver' || member.membershipLevel == 'Golden'){
            members.push(member);
        }
    });
    
    var memberSelection = [];
    var indexes = [];
    var index = 0;
    // Checks to see if 3 spotlights have been chosen
    while (indexes.length < 3){
        // Randomly selects a member index
        index = Math.floor(Math.random() * members.length);
        // Checks to see if member has already been chosen
        if (!indexes.includes(index)){
            memberSelection.push(members[index]);
            indexes.push(index)
        };
    }; 
        
    return memberSelection;
}

async function FetchData(){
    try{
        const response =  await fetch(dataFile);
        if(response.ok){
            const data =  await response.json();
            // Grabs members
            let members = GetSpotlight(data);
            // Grabs member data from JSON file
            GetData(members);
        }
    }
    catch (error){
        console.log(error)
    }
    
}

FetchData();