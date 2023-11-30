// "name": "Joseph",
// "lastname": "Smith",
// "birthdate": "23 December 1805",
// "death": "27 June 1844",
// "length": 14,
// "order": 1,
// "birthplace": "Vermont",
// "numofchildren": 11,
// "imageurl": "https://

const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

function displayProphets(prophets){
    prophets.forEach((prophet) => {
        let section = document.createElement("section")
        // Builds the format for the sections to automatically be filled by the json
        let sectionHTML = `
            <h3>${prophet.name} ${prophet.lastname}</h3>
            <p>Date of Birth: ${prophet.birthdate}</p>
            <p>Place of Birth: ${prophet.birthplace}</p>
            <img src="${prophet.imageurl}" alt="Picture of ${prophet.name} ${prophet.lastname}">
            `
            section.innerHTML = sectionHTML;
            cards.appendChild(section);
    });
}

async function getProphetData(){
    // Waits until url is done fetching
    const response = await fetch(url);
    // .ok means the fetch succeeded.
    if (response.ok){
        // 'response.json' turns the text from the 'response' file and turns it into a json object
        // You need to put await otherwise it will keep trying to pull
        const data = await response.json();
        // data."PROPHETS" references the json name of the object.
        displayProphets(data.propets)
    }
    else{
        console.error("UH OH!!!!!!!!!!!!")
    }
};