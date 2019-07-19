const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})
document.addEventListener("DOMContentLoaded", setUpPage)

function setUpPage(){

   let form = document.querySelector(".add-toy-form")
   // // debugger
   form.addEventListener("submit", handleSubmit)

   getAllToys()
}

function handleSubmit(e){
  e.preventDefault()

 let toy = {
   name: e.target.name.value,
   image: e.target.image.value,
   likes: 0
 }
  addNewToy(toy)
  e.target.reset()
}

function getAllToys(){
 const toys = 'http://localhost:3000/toys'
 fetch(toys)
 .then(response => response.json())
 .then(data => createToyList(data))
}

function createToyList(toys){
 toys.forEach(toyCards)
}

function toyCards(toy){
 const div = document.querySelector("#toy-collection")

 let divTwo = document.createElement("div")
 divTwo.className = "card "

 let name = document.createElement("h2")
 name.innerText = toy.name

 let img = document.createElement("img")
 img.className = "toy-avatar"
 img.src = toy.image

 let likeButton = document.createElement("button")
  likeButton.addEventListener("click", handleSubmitLike)
  likeButton.className = "likeButton"
  likeButton.innerText = toy.likes + " Likes"
  likeButton.setAttribute("data-id", toy.id)

//  let likes = document.createElement("p")
//  likes.innerText = toy.likes

 div.appendChild(divTwo)
 divTwo.appendChild(name)
 divTwo.appendChild(img)
 divTwo.appendChild(likeButton)
//  divTwo.appendChild(likes)
}

 function handleSubmitLike(e){
   let moreLikes = parseInt(e.target.innerText) + 1
 fetch (`http://localhost:3000/toys/${e.target.dataset.id}`, {
 method: 'PATCH',
 headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json'
 },
 body: JSON.stringify({
   likes: moreLikes
 })
})
 .then(response => response.json())
 .then(data => {
   e.target.innerText = `${moreLikes} Likes`
 })
}



function addNewToy(toy){
 fetch("http://localhost:3000/toys", {
     method: "Post",
     headers: {
       "Content-Type": "application/json"
     },
     body:JSON.stringify(toy)
 })
 .then(res => res.json())
 .then(function(data){
   toyCards(data)})
 .catch(res => console.log("Error:", res))
}

// OR HERE!
