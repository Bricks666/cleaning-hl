const {UsersContract} = require("./Users");
const {CleaningContract} = require("./OfferCleaning");
const {OfferContract} = require("./OfferToWorker");
const {CarsContract} = require("./Cars");

module.exports.CarsContract = CarsContract;
module.exports.OfferContract = OfferContract;
module.exports.CleaningContract = CleaningContract;
module.exports.UsersContract = UsersContract;
module.exports.contracts = [UsersContract, CleaningContract, OfferContract, CarsContract];