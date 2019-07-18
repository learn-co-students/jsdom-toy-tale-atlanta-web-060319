document.addEventListener('DOMContentLoaded', pageSetUp())

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

let allToys = document.querySelector('#toy-collection')

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', handleSubmit)
  } else {
    toyForm.style.display = 'none'
  }
})

function handleSubmit(e) {
  e.preventDefault()
  console.log(e.target.name.value)
  console.log(e.target.image.value) 
 
  let toy = {
    name: e.target.name.value,
    image: e.target.image.value
  }
  makeToyCard(toy)
  saveToy(toy)
}

function saveToy(toy){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body:JSON.stringify(toy)
  })
  .then( response => response.json())
  .then(data => console.log(data))
}

function getAllToys() {
   fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => renderAllToys(toys))
    
}

function pageSetUp(){
  getAllToys()
}


function makeToyCard(toy){
let h2 = document.createElement('h2')
h2.innerText = (`Name: ${toy.name}`)

let img = document.createElement('img')
img.setAttribute('src', toy.image)
img.setAttribute('class', 'toy-avatar')

let p = document.createElement('p')
p.innerText = (`Likes: ${toy.likes}`)

let likeBtn = document.createElement('button')
likeBtn.innerText = 'like <3'
likeBtn.setAttribute('class', 'like-btn')

allToys.appendChild(h2)
allToys.appendChild(img)
allToys.appendChild(p)
allToys.appendChild(likeBtn)
}


function renderAllToys(toys) {
  toys.forEach(toy => makeToyCard(toy))
}

