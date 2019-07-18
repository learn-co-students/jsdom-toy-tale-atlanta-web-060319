const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", setUpPage)

function setUpPage() {
  let form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", handleSubmit)
  getToys()
}

function createToyCard (toy) {
  const toyList = document.getElementById("toy-collection")
  
  let div = document.createElement("div")
  div.className = "card"

  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"

  let p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`

  let button = document.createElement("button")
  button.className = "like-btn"
  button.innerText = "Like <3"
  button.setAttribute("data-id", toy.id)
  button.addEventListener("click", handleLikeBtn)


  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  toyList.appendChild(div)
}

function handleLikeBtn(e) {
  let moreLikes = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: moreLikes
    })
    })
    .then(resp => resp.json())
    .then(data => {
      e.target.previousElementSibling.innerText = `${moreLikes} Likes`
    })
  }


function createToyList(toys) {
  toys.forEach(createToyCard)
}

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => createToyList(data))
}

function addToys(toy) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toy.name,
      image: toy.image,
      likes: 0
    })
  })
  .catch(res => console.log("Error:", res))
  .then(res => res.json())
  .then(data => createToyCard(data))
}

function handleSubmit(e){
  e.preventDefault()
  let toyCard = {name: e.target.name.value,
      image: e.target.image.value
  }
  addToys(toyCard)
}


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


// OR HERE!
