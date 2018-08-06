const contractAddressTestnet = "n1fV9u2C97AX34D5psUUuBoFiszNwbLC4S6";
const contractAddress = "n1oxMTBUPHvA5fimWE2yFbyorh1wNvMPHr8";

let NebPay = require("nebpay");
let nebPay = new NebPay();

function getWallet(cb) {
    let value = "0";
    let callFunction = "getWallet";

    let callArgs = `[]`;
    nebPay.simulateCall(contractAddress, value, callFunction, callArgs, {
        callback: function (resp) {
            if (cb) {
                cb(resp);
            }
        }
    });
}

function getGamesCount(cb) {
    let value = "0";
    let callFunction = "getGamesCount";

    let callArgs = `[]`;
    nebPay.simulateCall(contractAddress, value, callFunction, callArgs, {
        callback: function (resp) {
            if (cb) {
                cb(resp);
            }
        }
    });
}

function getUser(wallet, cb) {
    let value = "0";
    let callFunction = "getUser";

    let callArgs = `["${wallet}"]`;
    nebPay.simulateCall(contractAddress, value, callFunction, callArgs, {
        callback: function (resp) {
            if (cb) {
                cb(resp);
            }
        }
    });
}

function getUserGames(wallet, cb) {
    let value = "0";
    let callFunction = "getUserGames";

    let callArgs = `["${wallet}"]`;
    nebPay.simulateCall(contractAddress, value, callFunction, callArgs, {
        callback: function (resp) {
            if (cb) {
                cb(resp);
            }
        }
    });
}

function getLastTenGames(cb) {
    let value = "0";
    let callFunction = "getLastTenGames";

    let callArgs = `[]`;
    nebPay.simulateCall(contractAddress, value, callFunction, callArgs, {
        callback: function (resp) {
            if (cb) {
                cb(resp);
            }
        }
    });
}

// TODO: remove rnd after updating Mainnet
function playGame(amount, flipsCount, coinSide, cb) {
    let date = Date.now();
    let rnd = [];
    
    for (let i = 0; i < flipsCount; i++) {
        rnd[i] = Math.floor(Math.random() * 2);
    }

    let value = amount.toString();
    let callFunction = "playGame";
    let callArgs = `["[${rnd}]", "${flipsCount}", "${coinSide}", "${date}"]`;

    nebPay.call(contractAddress, value, callFunction, callArgs, {
        callback: function (resp) {
            if (cb) {
                cb(resp);
            }
        }
    });
}