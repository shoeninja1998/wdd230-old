const darkmode = document.querySelector("#darkmode");
const body = document.querySelector("body");
const header = document.querySelector("header");
const card = document.getElementsByClassName("card");


    darkmode.addEventListener('click', () => {
        if (darkmode.textContent === 'DARK') {
            body.style.backgroundColor = "#808080";

            header.style.backgroundColor = "#000";
            header.style.color = "#fff";

            for (let i = 0; i < card.length; i++) {
                card[i].style.backgroundColor = "#000";
                card[i].style.color = "#fff";
            }
    
            darkmode.textContent = 'LIGHT';

        } else {
            body.style.backgroundColor = "#eee";

            for (let i = 0; i < card.length; i++) {
                card[i].style.backgroundColor = "#d3d3d3";
                card[i].style.color = "#000";
            }

            header.style.backgroundColor = "#7fffd4";
            header.style.color = "#000";

            darkmode.textContent = 'DARK';
        }
    });