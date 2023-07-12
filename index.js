window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fish-button').addEventListener('click', createCards)
    document.getElementById('bug-button').addEventListener('click', createCards)
})

function createCards(e) {
    document.getElementById('container').innerHTML = ''
    const fetchEndpoint = e.target.value
    
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
    const infoContainer = document.createElement('div')
    const name = document.createElement('h2')
    const picture = document.createElement('img')
    const description = document.createElement('p')

    bgShadow.id = 'background-shadow'
    infoContainer.id = 'info-container'
    name.id = 'full-info-name'
    picture.id = 'full-info-picture'
    description.id = 'full-info-description'
    name.textContent = handleName(item['file-name'])
    picture.src = item.image_uri
    picture.alt = `Picture of a ${item['file-name']}`
    description.textContent = item['museum-phrase']

    infoContainer.append(name, picture, description)
    bgShadow.append(infoContainer)
    document.getElementById('container').append(bgShadow)
    
}
