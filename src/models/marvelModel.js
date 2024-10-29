const path = require('path');
const fs = require('fs');

let heroList=[]; //Simpel array for at gemme helte
let currentId=1

//Opret ny helt
exports.create=(heroData)=>{
    const newHero={
        id:currentId++,
        ...heroData
    };
    heroList.push(newHero);
    return newHero;
};

//Hent alle helte
exports.findAll=()=>{
    return heroList;
};

//Hent helt ved Id
exports.findById=(id)=>{
    return heroList.find(hero=>hero.id==id);
};

//Opdater helt
exports.update=(id, updatedData)=>{
    const heroIndex=heroList.findIndex(hero=>hero.id==id);
    if (heroIndex===-1) return null;
    heroList[heroIndex]={id: Number(id),...updatedData};
    return heroList[heroIndex];
};

//Slet helt
exports.delete=(id)=>{
    const heroIndex=pokemonList.findIndex(pokemon=>pokemon.id==id);
    if (heroIndex===-1) return false;
    heroList.splice(heroIndex, 1)
    return true;
};





