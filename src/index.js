const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const allToys = 'http://localhost:3000/toys/'
  const toyList = document.querySelector('#toy-collection')
  function init() {
    fetch(allToys)
    .then(res => res.json())
    .then(toys => toys.map(toy => renderToy(toy)))
  }
  
  function renderToy(toy) {
    toyList.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img class ="toy-avatar" src=${toy.image}>
    <p> likes: <span>${toy.likes}</span></p>
    <button data-id=${toy.id} class="like-btn">Like</button>
    </div>`
  }
  document.addEventListener('click', handleClick)
  document.addEventListener('submit', handleSubmit)

  function handleClick(e) {
    if (e.target.className === "like-btn") {
      addLikes(e.target)
    }
  }

  function addLikes(eventTarget) {
    // debugger
    let moreLikes = parseInt(eventTarget.previousElementSibling.firstElementChild.innerText) + 1
    fetch(allToys + eventTarget.dataset.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        likes: moreLikes
      })
    })
    .then(res => res.json())
    .then(eventTarget.previousElementSibling.firstElementChild.innerText = `${moreLikes}`)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    let toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    addNewToy(toy)
  }

  function addNewToy(toy) {
    fetch(allToys, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(data => renderToy(data))
    .catch(res => console.log("Error: ", res))
  }
  
  
  init()
})


// OR HERE!
