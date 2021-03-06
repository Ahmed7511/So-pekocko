const Sauce = require('../models/Sauce');
const fs = require('fs');

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {        
        Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });
})
.catch(error => res.status(500).json({error}));
  };

  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?           
    {
      ...JSON.parse(req.body.sauce),  //on parse la chaine de caracters
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // si le req.file exsiste
    } : {...req.body};        // si le req.file n'exsiste pas
    
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce);      //on parse la chaine de caractéres 
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save() 
  .then(() => res.status(201).json({ message: 'objet créé !'}))
  .catch(error => res.status(400).json({error}));
}

exports.getOneSauce = (req, res, next) =>{
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}
exports.getAllSauce = (req, res, next) =>{
   Sauce.find()
    .then(sauces => res.status(201).json(sauces))
    .catch(error => res.status(400).json({error}))
  }

  exports.likeSauce = (req, res, next) => {   
    Sauce.findOne({_id: req.params.id})
    .then(sauce => { 
      switch (req.body.like) { 
  
        case 1 : // if user like the sauce  
        if (!sauce.usersLiked.includes(req.body.userId)) {  //on vérife si le user n'a pas like déja cet sauce
           Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
           // on Incremente like et en push the userId dans le tableau usersLiked
           .then(() => res.status(201).json({ message: 'Like ajouté avec succès !' }))
           .catch(error => res.status(400).json({error}));
               
         } 
       break;

       case -1 : // if user Dislike the sauce 
       if (!sauce.usersDisliked.includes(req.body.userId)) {  //on vérife si le user n'a pas Dislike déja cet sauce
        Sauce.updateOne({_id: req.params.id}, {$inc: {Dislikes: 1}, $push: {usersDisliked: req.body.userId}, _id: req.params.id})
        // on Incremente Dislike et en push the userId dans le tableau usersDisLiked
         .then(() => res.status(201).json({message: 'DisLike ajouté avec suucès !'}))
         .catch(error => res.status(400).json({error}));
       }
       break;
       
       case 0 : 
       if (sauce.usersLiked.includes(req.body.userId)) {  //on vérife si le user a like déja cet sauce
        Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId},_id: req.params.id})
        // on enléve le like et en eléve users'Id du tableau usersLiked
        .then(()=> res.status(201).json({message: 'like annulé avec succès !'}))
        .catch(error => res.status(400).json({error}));
       } else if (sauce.usersDisliked.includes(req.body.userId)){ // si le user a Dislike déja cet sauce
        Sauce.updateOne({_id: req.params.id}, {$inc: {Dislikes: -1}, $pull: {usersDisliked: req.body.userId},_id: req.params.id})
                 // on enléve le Dislike et en eléve users'Id du tableau sersDisliked
                 .then(()=> res.status(201).json({message: 'Dislike annulé avec succès !'}))
                 .catch(error => res.status(400).json({error}));
       } 
      break;
   
     default:
       throw("impossible de réagir sur cet sauce reéssayer plus tard !")  // on envoie l'exeption
      }
             })
    .catch(error => res.status(400).json({ error }));
  };