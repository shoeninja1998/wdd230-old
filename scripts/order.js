let orderUrl = new URL(window.location);
let params  = orderUrl.searchParams;

const url = `./data/fruit.json`;

let calories = 0;
let carbohydrates = 0;
let fat = 0;
let sugar = 0;
let protein = 0;

function GetPickupTime(){
    const currentTime = new Date();
    const format = {hour: 'numeric', minute: '2-digit', hour12: 'true'};
    currentTime.setMinutes(currentTime.getMinutes() + 30);
    return currentTime.toLocaleTimeString([], format);
}

function GetNutrition(fruitsData){
    const fruit1 = params.get("fruit1");
    const fruit2 = params.get("fruit2");
    const fruit3 = params.get("fruit3");
    

    const fruits = [fruit1, fruit2, fruit3];

    fruits.forEach(fruitName => {
        const fruitData = fruitsData.find(fruit => fruit.name === fruitName);

        if (fruitData) {
            calories += fruitData.nutritions.calories;
            carbohydrates += fruitData.nutritions.carbohydrates;
            fat += fruitData.nutritions.fat;
            sugar += fruitData.nutritions.sugar;
            protein += fruitData.nutritions.protein;
        }
    });}

async function GetFruitData(){
    try{
        const response = await fetch(url)
        if (response.ok){
            const data = await response.json();
            GetNutrition(data.fruits);
            SetOrderInfo();
            }
    }
    catch (error){
        console.error("Didn't fetch fruit data.", error);
    }
}

function SetOrderInfo(){
    // Nutrition info
    document.querySelector('#calories').textContent = `${calories}`;
    document.querySelector('#sugar').textContent = `${sugar}`;
    document.querySelector('#carbohydrates').textContent = `${carbohydrates}`;
    document.querySelector('#protein').textContent = `${protein}`;
    document.querySelector('#fat').textContent = `${fat}`;
    
    // Customer info
    document.querySelector('#name').textContent = params.get("fname");
    document.querySelector('#email').textContent = params.get("email");
    document.querySelector('#phone').textContent = params.get("phone");
    
    // Order info
    let pickupTime = GetPickupTime();
    document.querySelector('#pickupTime').textContent = pickupTime;
    
    document.querySelector('#fruit1').textContent = params.get("fruit1");
    document.querySelector('#fruit2').textContent = params.get("fruit2");
    document.querySelector('#fruit3').textContent = params.get("fruit3");
    document.querySelector('#instructions').textContent = params.get("instructions");
}

GetFruitData();

let count = parseInt(localStorage.getItem('drinkCounter') || 0);
    count++;
    localStorage.setItem('drinkCounter', count);