const { UsersContract } = require("./Users");
const { CleaningContract } = require("./OfferCleaning");
const { OfferContract } = require("./OfferToWorker");

module.exports.OfferContract = OfferContract;
module.exports.CleaningContract = CleaningContract;
module.exports.UsersContract = UsersContract;
module.exports.contracts = [UsersContract, CleaningContract, OfferContract];
