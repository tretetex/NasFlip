let Stubs = require("./contractStubs.js");
let CoinFlipContract = require("./contract.js");

var Blockchain = Stubs.Blockchain;
var LocalContractStorage = Stubs.LocalContractStorage;
Blockchain.changeTransactionAfterGet = false;

let contract = new CoinFlipContract();
contract.init();

contract.playGame("[1, 0, 1]", 3, "front", new Date());
let games = contract.getLastTenGames();
console.log(games);