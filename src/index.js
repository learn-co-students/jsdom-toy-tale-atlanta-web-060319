document.addEventListener('DOMContentLoaded', pageLoaded)

function pageLoaded(){
  fetchToys() 
}

let addToyBtn = document.querySelector('#new-toy-btn')
addToyBtn.addEventListener('click', handleToyBtn)

function handleToyBtn(){
  let toyForm = document.querySelector('.container')

  let addToy = false

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', handleSubmit)

    function handleSubmit(e){
      e.preventDefault()
      let newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      }
      saveNewToy(newToy)
    }

    function saveNewToy(newToy){
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newToy)
      })
      .catch(error => console.error('Error:', error))
      .then(res => res.json())
    }
  } else {
    toyForm.style.display = 'none'
  }
}


function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => listToys(toys))
}

function listToys(toys){
  toys.forEach(toy => toyCard(toy))
}

function toyCard(toy){
  //h2, img(src), p, button
  let div = document.querySelector('#toy-collection')
  let toyDiv = document.createElement('div')
  toyDiv.setAttribute('class', 'card')
  toyDiv.dataset.id = toy.id

  
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('IMG')
  img.src = toy.image
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = (toy.likes + ' Likes')

  let likebtn = document.createElement('button')
  likebtn.innerText = 'Like <3'
  likebtn.setAttribute('class', 'like-btn')
  likebtn.addEventListener('click', handleLikeBtn)

  toyDiv.appendChild(h2)
  toyDiv.appendChild(img)
  toyDiv.appendChild(p)
  toyDiv.appendChild(likebtn)
  div.appendChild(toyDiv)
  
}

function handleLikeBtn(e){
let newLike = parseInt(e.target.parentElement.querySelector('p').innerText) + 1
let toyId = e.target.parentElement.dataset.id

let newLikeObject = {
  likes: newLike
}
addLike(toyId, newLikeObject)
}

function addLike(toyId, newLikeObject){
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newLikeObject)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}


// OR HERE!
