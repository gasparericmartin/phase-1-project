window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fish-button').addEventListener('click', createCards)
    document.getElementById('bug-button').addEventListener('click', createCards)
})

function createCards(e) {
    document.getElementById('container').innerHTML = ''
    const fetchEndpoint = e.target.value
    console.log(fetchEndpoint)
    
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
