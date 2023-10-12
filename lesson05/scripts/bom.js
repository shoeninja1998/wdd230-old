// In your js file, declare three const variables that hold references to the input, button, and .list elements.
const myinput = document.querySelector("#favchap");
const mybutton = document.querySelector("#mybutton");
const mylist = document.querySelector("#list");
// Create a click event listener for the Add Chapter button using addEventListener and an anonymous function or arrow function.
mybutton.addEventListener('click', ()=>{

// In the click event function block {...}, do the following:
// check to make sure the input is not blank before doing the following remaining tasks in this list using an if block, 
// otherwise provide a message or at least do nothing and return the .focus() to the input field.
if (myinput.value == ''){
    myinput.focus()
    return
}
// create a li element
    let listitem = document.createElement("li");
// create a delete button
    let deletebutton = document.createElement("button");
// populate the li elements textContent or innerHTML with the input value
    listitem.textContent = myinput.value
// populate the button textContent with a ❌
    deletebutton.textContent = '❌'
// append the li element with the delete button
    listitem.appendChild(deletebutton)
// append the li element to the unordered list in your HTML
    mylist.appendChild(listitem)
// add an event listener to the delete button that removes the li element when clicked
    deletebutton.addEventListener('click',()=>{
        listitem.remove()
    })
// send the focus to the input element
    myinput.focus()
// change the input value to nothing or the empty string to clean up the interface for the user
    myinput.value = ''
})