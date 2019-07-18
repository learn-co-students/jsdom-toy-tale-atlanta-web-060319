const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", getToysAndDisplay)

let form = document.querySelector(".add-toy-form")
form.addEventListener("submit", handleSubmit)

let button = document.querySelector(".like-btn")
button.addEventListener("click", handleLike)

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

function getToysAndDisplay() {
	fetch("http://localhost:3000/toys")
		.then((response) => response.json())
		.then((jsoArr) => toysDisplay(jsoArr))
}

function toysDisplay(jsoArr) {
	
	jsoArr.forEach((toy) => {
		let toyCollection = document.querySelector("#toy-collection")

		let toyCard = document.createElement("div")
		toyCard.className = "card"
		toyCard.id = toy.id
		
		let h2 = document.createElement("h2")
		h2.innerText = toy.name
		
		let image = document.createElement("img")
		image.className = "toy-avatar"
		image.src = toy.image

		let likes = document.createElement("p")
		likes.innerText = toy.likes

		let likebtn = document.createElement("button")
		likebtn.className = "like-btn"
		likebtn.innerText = "Like"

		toyCard.appendChild(h2)
		toyCard.appendChild(image)
		toyCard.appendChild(likes)
		toyCard.appendChild(likebtn)

		toyCollection.appendChild(toyCard)
	})
}

function handleSubmit(event) {
	event.preventDefault()

	let newtoy = {
		name: event.target[0].value,
		image: event.target[1].value,
		likes: 0
	}

	let config = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body:JSON.stringify(newtoy)
    }

	fetch("http://localhost:3000/toys", config)
	.then((response) => response.json())
	.then((jso) => toysDisplay([jso]))

	.catch((error) => console.log("Error:", error));

	event.target.reset()
}

function handleLike() {
	let config = {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body:JSON.stringify(newtoy)
    }
}











































