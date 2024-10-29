const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'heroes.json');

// Function to read data from JSON file
function readData() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return { currentId: 1, heroList: [] }; // Default values if file doesn't exist
    }
}

// Function to write data to JSON file
function writeData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

// Create a new hero
exports.create = (heroData) => {
    const data = readData();

    // Set the new hero ID and add to the list
    const newHero = { id: data.currentId++, ...heroData };
    data.heroList.push(newHero);

    // Write the updated data to the JSON file
    writeData(data);

    return newHero;
};

// Retrieve all heroes
exports.findAll = () => {
    return readData().heroList;
};

// Retrieve a hero by ID
exports.findById = (id) => {
    return readData().heroList.find((hero) => hero.id == id);
};

// Update a hero by ID
exports.update = (id, updatedData) => {
    const data = readData();
    const heroIndex = data.heroList.findIndex((hero) => hero.id == id);
    if (heroIndex === -1) return null;

    data.heroList[heroIndex] = { id: Number(id), ...updatedData };
    writeData(data); // Save changes to file

    return data.heroList[heroIndex];
};

// Delete a hero by ID
exports.delete = (id) => {
    const data = readData();
    const initialLength = data.heroList.length;
    data.heroList = data.heroList.filter((hero) => hero.id != id);

    if (data.heroList.length < initialLength) {
        writeData(data); // Save changes to file
    }
};
