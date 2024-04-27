require('dotenv').config();
const mongoose = require('mongoose');
// Retrieve MongoDB URI from environment variable

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model("Person", personSchema);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// creating and saving a record of a model

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: 'John Doe',
    age: 28,
    favoriteFoods: ["apple", "banana", "Shorwo"]
  });
  newPerson.save(function(err, data) {
    if(err) return console.error(err);
    done(null, data);
  });
};

// Create Many Records with model.create()

const arrayOfPeople = [
  { name: 'user1',  age: 25, favoriteFoods: ["eggs", "fish", "fresh fruit"] },
  { name: 'user2',  age: 30, favoriteFoods: ["vegitables",  "mutton", "dried fruit"] },
  { name: 'user3',  age: 35, favoriteFoods: ["chickpees", "veegan", "fresh fruit"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err) {return console.log(err)}
    done(null, people);
  })
};

/* Use `Model.find()` */

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound)=>{
    if(err) {return console.log(err);}
    done(null , personFound);
  })
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, personFound) => {
    if(err) return console.log(err);
    done(null, personFound);
  });
};


// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, idFound) => {
    if(err) return console.log(err);
    done(null , idFound);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, personFound) => {
    if(err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true}, (err, foundId)=> {
    if(err) return console.log(err);
    done(null , foundId);
  });
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId} , 
    (err, foundId) => {
      if(err) return console.log(err);
      done(null, foundId);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedNames) => {
    if(err) return console.log(err); 
    done(null, removedNames);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let query = Person.find({favoriteFoods: {$all: [foodToSearch]}});
  query.sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((err, foundPerson) => {
    if(err) return console.log(err);
    done(null, foundPerson);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
