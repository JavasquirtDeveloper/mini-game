let start = document.querySelector('#start')
let game = document.querySelector('#game')
let score = 0
let $time = document.querySelector('#time')
let startedGame = false
let result = document.querySelector('#result')
let resultHeader = document.querySelector('#result-header')
let inputValue = document.querySelector('#game-time')
let timeHeader = document.querySelector('#time-header')
$time.textContent = inputValue.value
let colors = ['#d9a7c7','#fffcdc','#2948ff','#396afc','#C9D6FF','#7F00FF','#E100FF','#ff9966','#ff5e62','#22c1c3','#fdbb2d']
start.addEventListener('click', startGame)

game.addEventListener('click', handleBoxClick)

function startGame() {
	start.classList.add('hide')
	game.style.backgroundColor = '#fff'
	let interval = setInterval(function () {
		let time = +$time.textContent
		if (time <= 0) {
			clearInterval(interval)
			endGame()
		} else {
			$time.textContent = (time - 0.1).toFixed(1)
		}
	}, 100)
	renderBox()
	score = 0
	$time.textContent = inputValue.value
	timeHeader.classList.remove('hide')

	resultHeader.classList.add('hide')
}

function renderBox() {
	let box = document.createElement('div')
	startedGame = true
	game.innerHTML = ''
	let randomSize = getRandom(30, 100)
	let gameSize = game.getBoundingClientRect()
	let maxTop = gameSize.height - randomSize
	let maxLeft = gameSize.width - randomSize
	box.style.height = box.style.width = randomSize + 'px'
	let colorIndex = getRandom(0, colors.length)
	box.style.backgroundColor = colors[colorIndex]
	box.style.position = 'absolute'
	box.style.left = getRandom(0, maxLeft) + 'px'
	box.style.top = getRandom(0, maxTop) + 'px'
	box.style.cursor = 'pointer'

	box.setAttribute('data-box', 'true')
	game.insertAdjacentElement("afterbegin", box)
}

function endGame() {
	timeHeader.classList.add('hide')
	startedGame = false
	start.classList.remove('hide')
	game.style.backgroundColor = '#ccc'
	game.innerHTML = ''
	resultHeader.classList.remove('hide')
	result.textContent = score
	$time.textContent = inputValue.value
	
}

function handleBoxClick(event) {
	if (!startedGame) {
		return
	}
	if (event.target.dataset.box) {
		renderBox()
		score++
	}
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}


