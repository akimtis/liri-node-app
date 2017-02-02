// Load the NPM Package inquirer
var inquirer = require("inquirer");

function Band(name, numBandMembers){
  this.name = name;
  this.numBandMembers = numBandMembers;
}

var bands = [];

function askBandInfo(){
  // Created a series of questions
  inquirer.prompt([
    {type: "input",
      name: "bandName",
      message: "What's your band's name?"},
    {type: "input",
      name: "numBandMembers",
      message: "Number of band members in the band?"},]).then(function(data){
        var newBand = new Band(data.bandName, data.numBandMembers);
        bands.push(newBand);
        if (bands.length == 1) console.log(bands); //this one did
  });
}

for (var i=0; i<5; i++){
  askBandInfo();
}