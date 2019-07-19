document.addEventListener('DOMContentLoaded', pageLoaded)

function pageLoaded(){
  getAllToys() 
}

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let allToys = document.querySelector('#toy-collection')
const url = 'http://localhost:3000/toys'


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', handleSumbit)
  } else {
    toyForm.style.display = 'none'
  }
})

function handleSumbit(e){
  e.preventDefault()
  let toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: '0'
  }
  toyCard(toy)
  saveToy(toy)
}

function saveToy(toy){
  fetch(url,{
    method: 'POST',
    header: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => console.log(data) )
}



function getAllToys(){
  fetch(url)
  .then(resp => resp.json())
  .then(toys => listAllToys(toys))
}


function toyCard(toy){
  let name = document.createElement('h2')
  name.innerText = toy.name

  let image = document.createElement('img')
  image.setAttribute('src', toy.image)
  image.setAttribute('class', 'toy-image-url')

  let likes = document.createElement('p')
  likes.innerText = (toy.likes + ' Likes')
  
  let likeBtn = document.createElement('button')
  likeBtn.innerText = 'Like <3' 

  allToys.appendChild(name)
  allToys.appendChild(image)
  allToys.appendChild(likes)
  allToys.appendChild(likeBtn)
}

function listAllToys(toys){
  toys.forEach(toy => toyCard(toy))
}



// OR HERE!
