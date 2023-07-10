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
        
        itemContainer.append(itemName, itemImage)
        document.getElementById('container').append(itemContainer)
    }))
}

