// Create a key
const VISITS_KEY = 'site-visits';

function GetSiteVisits(){
// Check to see if the key exists in local storage
    let current_value = localStorage.getItem(VISITS_KEY)
    
// If the key doesn't exist, initialize the key to 1 (First visit)
    let siteVisits = 1

// If the key does exist, add 1 to the current value
    if (current_value != null){
        siteVisits = parseInt(current_value) + 1
    }
    
// Save the new value for current visits
    localStorage.setItem(VISITS_KEY, `${siteVisits}`)
    return siteVisits
}
// Update the html page with the current visits
    document.getElementById("visitcount").textContent = `${GetSiteVisits()}`
