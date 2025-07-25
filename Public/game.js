const guessForm = document.getElementById('guess-form')
const guessInput = document.getElementById('number')
const guessBtn = document.getElementById('guess-btn')

const alert = document.getElementById('alert')
const info = document.getElementById('info')
const scoreboard = document.getElementById('scoreboard')
const result = document.getElementById('result')
const resultSub = document.getElementById('result-subtitle')
const resultImage = document.getElementById('result-image')
const roundInfo = document.getElementById('round')
const gameWindow = document.getElementById('game-window')

const nameForm = document.getElementById('name-form')
const nameInput = document.getElementById('name')
const nameLabel = document.getElementById('name-label')
const nameBtn = document.getElementById('name-btn')

const bulletSprite = document.getElementById('bullets')
const gunSprite = document.getElementById('gun')
const targetGroup = document.getElementById('target-group')

const shotVFX = new Audio('Public/SFX/Hit4.wav')
const targetVFX = new Audio('Public/SFX/Jump.wav')
const winVFX = new Audio('Public/SFX/1up1.wav')
const loseVFX = new Audio('Public/SFX/Lose3.wav')

const spritesFolder = "Public/Sprites/"
const markSprite = "mark.png"
const bulletSprites = ["bullets0.png", "bullets1.png", "bullets2.png",
                        "bullets3.png", "bullets4.png", "bullets5.png",
                        "bullets6.png", "bullets7.png", "bullets8.png"]
const resultSprites = ['trophy.png', 'empty.png']

const gameStates =
    {
        running: 0,
        win: 1,
        lose: 2
    }

let scoresList = [
    {
        name: 'mrl',
        score: 22
    }, 
    {
        name: 'lly',
        score: 18
    }, 
    {
        name: 'ted',
        score: 15
    }, 
    {
        name: 'rbn',
        score: 13
    }, 
    {
        name: 'bar',
        score: 8
    }]

let triesCount = 8;
let score = 0
let round = 1
let guessValue = null
let nameValue = null
let state = gameStates.running

let bulletMarks = []

let target = RandomNumber(100)

LoadScores()
LoadRoundInfo()

guessForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (state != gameStates.running) {return}

    const parsedValue = parseInt(guessValue)

    gunSprite.style.animationPlayState = 'running'
    gunSprite.classList.remove('shoot')
    setTimeout(() => {gunSprite.classList.add('shoot')}, 1)

    if (!parsedValue)
    {
        alert("El campo no puede estar vacío")
        return
    }

    else if (parsedValue > 100)
    {
        alert("El número no puede ser mayor a 100")
        return
    }

    else if (parsedValue < 0)
    {
        alert("El número no puede ser menor a 0")
        return
    }

    shotVFX.play()
    triesCount--
    let distance = Math.abs(target - parsedValue)

    if (distance < 50)
    {
        distance = (distance / 50) * 50
        let dirX = 1 - Math.random() - 0.5
        let dirY = 1 - Math.random() - 0.5
        console.log(`Vector (${dirX}, ${dirY}`)

        const length = Math.sqrt((dirX * dirX) + (dirY * dirY))
        dirX /= length
        dirY /= length
        console.log(`Vector normalized (${dirX}, ${dirY}`)

        const mark = document.createElement('img')
        mark.classList.add('mark')
        mark.src = spritesFolder + markSprite
        targetGroup.append(mark)
        bulletMarks.push(mark)
        
        if (parsedValue < target)
        {
            mark.style.left = (50 + dirX * distance) + '%'
            mark.style.top = (50 + Math.abs(dirY) * distance) + '%'
        }

        if (parsedValue > target)
        {
            mark.style.left = (50 + dirX * distance) + '%'
            mark.style.top = (50 - Math.abs(dirY) * distance) + '%'
        }

        if (parsedValue === target)
        {
            mark.style.left = '50%'
            mark.style.top = '50%'

            info.innerHTML = "Cambiando de ronda"
            info.style.animationPlayState = 'running'
            info.classList.remove('blink')
            setTimeout(() => {info.classList.add('blink')}, 1)

            targetGroup.style.animationPlayState = 'running'
            targetGroup.classList.remove('clear')
            setTimeout(() => {targetGroup.classList.add('clear')}, 1)
            
            score += triesCount + 1
            round++
            if (triesCount <= 4) triesCount += 4
            else triesCount = 8

            targetVFX.play()
            target = RandomNumber(100)
            RemoveMarks()
            LoadRoundInfo()
        }
    }
    else {
        info.innerHTML = "Fuera de la diana"
        info.style.animationPlayState = 'running'
        info.classList.remove('blink')
        setTimeout(() => {info.classList.add('blink')}, 1)
    }

    if (triesCount <= 0)
    {
        GameOver(score)
    }

    UpdateGunSprite(triesCount)
    guessInput.value = ''
})

guessInput.addEventListener("input", (event) =>{
    guessValue = event.target.value
})

nameForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (state == gameStates.win) 
    {
        if (nameValue == '')
        {
            alert("El campo no puede estar vacío")
            return
        }
        let convertedName = nameValue.toLowerCase()
        if (scoresList.length == 5) scoresList.pop()
        scoresList.push({name: convertedName, score: score})
        SortScores()
    } 

    alert.classList.add('invisible')
    triesCount = 8
    score = 0
    round = 1
    gameWindow.style.pointerEvents = 'all'
    state = gameStates.running
    RemoveMarks()
    LoadRoundInfo()
    LoadScores()
    UpdateGunSprite()
})

nameInput.addEventListener("input", (event) =>{
    nameValue = event.target.value
})

function RandomNumber(max)
{
    return Math.floor(Math.random() * max + 1)
}

function RemoveMarks()
{
    bulletMarks.forEach(element => {
        element.remove()
    });
    bulletMarks = []
}

function GameOver(finalScore)
{
    gameWindow.style.pointerEvents = 'none'
    if (score > scoresList[scoresList.length - 1].score || scoresList.length < 5)
    {
        state = gameStates.win
        result.innerHTML = '¡Entraste al podio!'
        resultSub.innerHTML = `Puntuación final - ${finalScore}`
        resultImage.src = spritesFolder + resultSprites[0]
        nameBtn.innerHTML = 'Enviar'
        nameInput.style.display = 'block'
        nameLabel.style.display = 'block'
        winVFX.play()
    } else {
        state = gameStates.lose
        result.innerHTML = 'Se te acabaron los intentos'
        resultSub.innerHTML = `Puntuación final - ${finalScore}`
        resultImage.src = spritesFolder + resultSprites[1]
        nameBtn.innerHTML = 'Reintentar'
        nameInput.style.display = 'none'
        nameLabel.style.display = 'none'
        loseVFX.play()
    }

    setTimeout(() => {alert.classList.remove('invisible')}, 1)
}

function UpdateGunSprite(count = 8)
{
    console.log(count)
    bulletSprite.src = spritesFolder + bulletSprites[count]
    console.log(spritesFolder + bulletSprite[count])
}

function SortScores() 
{
    scoresList.sort((a, b) => b.score - a.score)
}

function LoadScores()
{
    scoreboard.innerHTML = ''
    scoresList.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = `${element.name} - <span class: \'score\'>${element.score}</span>`
        scoreboard.append(li)
    });
}

function LoadRoundInfo() 
{
    roundInfo.innerHTML = `Ronda ${round} - Puntos ${score}`
}