const marvelModel = require('../models/marvelModel');

//Opret helt (create)
exports.createHero = (req, res) => {
    const newHero=marvelModel.create(req.body);
    return res.status(201).json({ message: 'Hero created!', hero: newHero });
};

//Læs alle helte (Read)
exports.getAllHeroes=(req,res)=>{
    const allHeroes=marvelModel.findAll();
    res.json(allHeroes);
};

//Læs en enkelt helt (read)
exports.getHeroById=(req,res)=>{
    const hero=marvelModel.findById(req.params.id);
    if(!hero){
        return res.status(404).json({error: 'Hero not found!'});
    }
    res.json(hero);
};

//Opdater helt (update)
exports.updateHero=(req,res)=>{
    const updatedHero=marvelModel.update(req.params.id,req.body);
    if(!updatedHero){
        return res.status(404).json({error: 'Hero not found!'});
    }
    res.json({message: 'Hero updated!', hero: updatedHero});
};

//Slet helt (delete)
exports.deleteHero=(req,res)=>{
    const deletedHero=marvelModel.delete(req.params.id);
    if(!deletedHero){
        return res.status(404).json({error: 'Hero not found!'});
    }
    res.json({message: 'Hero deleted!'});
};


