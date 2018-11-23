// Object oriented programming practice
// NB console.log() in each section commented out; remove from comments to test

// The Tree object constructor
function Tree(name, characteristics, habitats, fruit){
  this.name = name;
  this.characteristics = characteristics;
  this.habitats = habitats;
  this.fruit = fruit;
}

// Add the printCharacteristics method to the Tree prototype object
Tree.prototype.printCharacteristics = function() {
  return `${this.name} trees have the following characteristics:${this.characteristics}`;
};

// The Plant object constructor
function Plant(name, characteristics, habitats, fruit){
  this.name = name;
  this.characteristics = characteristics;
  this.habitats = habitats;
  this.fruit = fruit;
}

// Create oak and horseChesnut objects using the Tree object constructor
let oak = new Tree('Oak', ['great strength', 'resistant to insect and fungal attack', 'appealing grain markings'], 'Wide-ranging', 'acorn');
let horseChesnut = new Tree('Horse Chesnut', ['spectacular spring flowers', 'good for playing conkers', 'broad canopy'], 'Europe, parks and Citys in U.S. and Canada', 'Conker');

// Print the horseChesnut object to console
// console.log(horseChesnut);

// Use the printCharacteristics method for the oak object
console.log(oak.printCharacteristics());


/* **************************************** */
/* ******Iterate over all properties******* */
/* **************************************** */


// Declare variables to contain arrays for listing the properties related to the oak object
let ownProps = [];
let prototypeProps = [];

// Loop through the properties and assign each to the relevant variable
for(let property in oak){
  if(oak.hasOwnProperty(property)) {
    ownProps.push(property);
  } else {
    prototypeProps.push(property);
  }
}

// Print the ownProps and prototypeProps variables to the console
// console.log(`The properties of Tree are ${ownProps}.`);
// console.log(`The method on the Tree prototype is ${prototypeProps}.`);


/* **************************************** */
/* **********Constructor property********** */
/* **************************************** */


// Prints true if the object has that parent constructor
// console.log(oak.constructor === Tree);

// Prints false if the object does not have that parent constructor
// console.log(oak.constructor === Plant);