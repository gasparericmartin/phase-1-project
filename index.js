window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fish-button').addEventListener('click', createCards)
    document.getElementById('bug-button').addEventListener('click', createCards)
})

function createCards(e) {
    document.getElementById('container').innerHTML = ''
    const fetchEndpoint = e.target.value

    if (fetchEndpoint === 'fish') {
        document.getElementsByTagName('h1')[0].textContent = 'Fish'
        makeSwitchButton('bugs')
    }
    else if (fetchEndpoint === 'bugs') {
        document.getElementsByTagName('h1')[0].textContent = 'Bugs'
        makeSwitchButton('fish')
    }
    
    fetch(`https://acnhapi.com/v1a/${fetchEndpoint}`)
    .then(response => response.json())
    .then(data => data.forEach(item => {
        const itemContainer = document.createElement('div')
        const itemImage = document.createElement('img')
        const itemName = document.createElement('p')

        itemContainer.className = 'card'
        itemImage.class = 'item-image'
        itemImage.src = item.icon_uri
        itemImage.alt = `Picture of a ${item['file-name']}`
        itemName.textContent = handleName(item['file-name'])
        itemName.className = 'card-name'

        itemImage.addEventListener('pointerenter', handleHoverOnImage)
        itemImage.addEventListener('pointerout', handleHoverOffImage)
        itemContainer.addEventListener('click', getFullInfo)
        
        itemContainer.append(itemName, itemImage)
        document.getElementById('container').append(itemContainer)
    }))
}

function makeSwitchButton(endpoint) {
    const buttonContainer = document.createElement('div')
    const switchButton = document.createElement('input')

    buttonContainer.id = 'switch-button-container'
    switchButton.type = 'image'
    switchButton.id = `${endpoint}-button`
    switchButton.value = endpoint
    switchButton.src = `https://acnhapi.com/v1/icons/${endpoint}/1`

    switchButton.addEventListener('click', createCards)

    buttonContainer.append(switchButton)

    document.getElementsByTagName('h1')[0].append(buttonContainer)
}

function handleName(name) {
    const nameArray = []
    const newName = name.replace(/[^-0-9a-z]/gi, ' ').split(' ')

    newName.forEach(namePart => {
        let modName = namePart.split('')
        modName[0] = modName[0].toUpperCase()
    
        if(modName.findIndex(e => e === '-') !== -1) {
            const toCap = modName.findIndex(e => e === '-') + 1
            modName[toCap] = modName[toCap].toUpperCase()
        }
    
        nameArray.push(modName.join(''))
    })

    return nameArray.join(' ')
}


function handleHoverOnImage(e) {
    e.target.previousSibling.className = 'card-name-hover'
}

function handleHoverOffImage(e) {
    e.target.previousSibling.className = 'card-name'
}

function getFullInfo (e) {

    let fetchEndpoint = ''
    if (e.target.src) {
        fetchEndpoint = e.target.src.replace('/icons', '')
    }
    else if (e.target.nextSibling.src) {
        fetchEndpoint = e.target.nextSibling.src.replace('/icons', '')
    }
    else {
        fetchEndpoint = e.target.childNodes[1].src.replace('/icons', '')        
    }
        
    fetch(fetchEndpoint)
    .then(response => response.json())
    .then(data => displayFullInfo(data))
}

function displayFullInfo(item) {
    if (document.getElementById('background-shadow')) {
        document.getElementById('background-shadow').remove()
    }

    const bgShadow = document.createElement('div')
    const name = document.createElement('h2')
    const picture = document.createElement('img')
    const description = document.createElement('p')
    const escapeMessage = document.createElement('p')

    document.addEventListener('keydown', removeFullInfo)

    bgShadow.id = 'background-shadow'
    name.id = 'full-info-name'
    description.id = 'full-info-description'
    name.textContent = handleName(item['file-name'])
    picture.src = item.image_uri
    picture.alt = `Picture of a ${item['file-name']}`
    description.textContent = item['museum-phrase']
    escapeMessage.textContent = 'Press ESC to exit'

    if(item['image_uri'].split('/').find(e => e === 'fish')) {
        picture.id = 'full-info-fish-picture'
    }
    else {
        picture.id = 'full-info-bug-picture'
    }

    bgShadow.append(name, picture, description, escapeMessage)
    document.getElementById('container').append(bgShadow)
    
}

function removeFullInfo(e) {
    if (e.key === 'Escape') {
        document.getElementById('background-shadow').remove()
    }
    document.removeEventListener('keydown', removeFullInfo)
}
