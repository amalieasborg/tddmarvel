const heroList = document.getElementById('hero-list');
const createHeroButton = document.getElementById('create-hero');

// Function to fetch and display all heroes
async function fetchHeroes() {
    const response = await fetch('/'); // Match with the getAllHeroes route
    const heroes = await response.json();
    heroList.innerHTML = ''; // Clear existing list

    heroes.forEach((hero) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${hero.name} (${hero.alias})</strong> - Powers: ${hero.powers.join(', ')}
            <button onclick="deleteHero(${hero.id})">Delete</button>
            <button onclick="editHero(${hero.id})">Edit</button>
        `;
        heroList.appendChild(listItem);
    });
}

// Function to create a new hero
createHeroButton.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const alias = document.getElementById('alias').value;
    const powers = document.getElementById('powers').value.split(',').map(power => power.trim());

    const response = await fetch('/', { // Match with the createHero route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, alias, powers }),
    });

    if (response.ok) {
        await fetchHeroes(); // Refresh the list
        document.getElementById('hero-form').reset(); // Clear form inputs
    } else {
        console.error('Failed to create hero:', await response.json());
    }
});

// Function to delete a hero
async function deleteHero(id) {
    const response = await fetch(`/heroes/${id}`, { // Match with the deleteHero route
        method: 'DELETE',
    });

    if (response.ok) {
        await fetchHeroes(); // Refresh the list
    } else {
        console.error('Failed to delete hero:', await response.json());
    }
}

// Function to edit a hero (prompt for new values)
async function editHero(id) {
    const name = prompt('Enter new hero name:');
    const alias = prompt('Enter new hero alias:');
    const powers = prompt('Enter new hero powers (comma separated):').split(',').map(power => power.trim());

    const response = await fetch(`/heroes/${id}`, { // Match with the updateHero route
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, alias, powers }),
    });

    if (response.ok) {
        await fetchHeroes(); // Refresh the list
    } else {
        console.error('Failed to update hero:', await response.json());
    }
}

// Load heroes when the page is loaded
window.onload = fetchHeroes;
