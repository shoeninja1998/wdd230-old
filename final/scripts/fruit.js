// the total amount of carbohydrates, protein, fat, sugar,
// and calories based upon the three fruit choices selected on the form.
const url = `./data/fruit.json`;

function DisplayFruit(fruits){
    const fruitSelects = document.getElementsByClassName('fruitSelect');
    
    Array.from(fruitSelects).forEach((selectElement, index) => {
        fruits.forEach(fruit => {
            const optionElement = document.createElement('option');
            optionElement.text = fruit.name;
            selectElement.appendChild(optionElement);
        });
    });
}

async function GetFruitData(){
    try{
        const response = await fetch(url)
        if (response.ok){
            const data = await response.json();
            DisplayFruit(data.fruits);
            }
    }
    catch (error){
        console.error("Didn't fetch fruit data.");
    }
}

GetFruitData();