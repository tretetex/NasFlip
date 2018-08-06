'use strict';

function updateData() {
    getWallet((resp) => {
        let wallet = " ... ";
        if (resp.result) {            
            wallet = JSON.parse(resp.result);
            updateTotalGames();
            loadLastTenGames();
            loadGames(wallet);
            wallet = `<b style='font-size: 16px;'>Wallet</b>: ${wallet}`;
            document.querySelector(".noExtensionLogin").setAttribute("hidden", "hidden");
        }
        else {
            showLoaders();
            document.querySelector(".noExtensionLogin").attributes.removeNamedItem("hidden");
        }
        document.querySelector("#wallet").innerHTML = wallet;
    });
}

document.querySelector("#flip-btn").addEventListener("click", function () {
    let betSize = document.querySelector("#betSize").value;
    let flipsCount = document.querySelector("#flipsCount").value;
    let coinSide = document.querySelector("#coinSideFrontRadio").checked ? "front" : "back";

    playGame(betSize, flipsCount, coinSide, function (response) {
    });
});

function updateTotalGames() {
    getGamesCount((resp) => {
        let count = resp.result || 0;
        document.querySelector("#totalGames").innerHTML = JSON.parse(count);
    });
}

function updateWalletInfo(games) {
    let won = 0;
    let loss = 0;
    let ev = 0;

    for (const game of games) {
        let amount = convertWeiToNas(game.amount);
        if (game.isWon) {
            won++;
            ev += amount;
        } else {
            loss++;
            ev -= amount;
        }
    }

    let evSign = ev > 0 ? "+" : "-";
    if (ev == 0)
        evSign = "";

    document.querySelector("#walletEv").innerHTML = ev;
    document.querySelector("#walletWonCount").innerHTML = won;
    document.querySelector("#walletLossCount").innerHTML = loss;
}

function loadGames(wallet) {
    if (wallet) {
        getUserGames(wallet, function (resp) {
            if (resp.result) {
                let result = JSON.parse(resp.result);
                updateWalletInfo(result);

                if (result && result.length > 0) {

                    clearGames();

                    result = result.reverse();
                    for (const game of result) {
                        addGame(game);
                    }
                }
            }
            hideLoaders();
        });
    }
}

function clearGames() {
    document.querySelector(".games-history").innerHTML = "";
}

function addGame(game) {
    let container = document.querySelector(".games-history");
    let div = document.createElement('div');

    let gameIsWon = !!game.isWon;
    let gameSymbol = gameIsWon ? "+" : "-";
    let itemLossClass = gameIsWon ? "amount" : " amount-loss";
    let coinImagePath = game.coinSide == "front"
        ? "img/coin-front.png"
        : "img/coin-back.png";

    let innerHtml = `<div class="row d-flex align-items-center game">
                        <div class="col-md-4 d-flex  justify-content-center ${itemLossClass}">${gameSymbol}${convertWeiToNas(game.amount)}</div>
                        <div class="col-md-4 d-flex  justify-content-center date">${convertUnixStampToScreenDate(game.date)}</div>
                        <div class="col-md-4 d-flex  justify-content-center">
                            <img src="${coinImagePath}">
                        </div>
                    </div>`;

    div.innerHTML = innerHtml;
    container.append(div.firstChild);
}

function loadLastTenGames() {
    getLastTenGames(function (resp) {
        if (resp.result) {
            let result = JSON.parse(resp.result);
            if (result && result.length > 0) {
                clearLastGames();

                result = result.reverse();
                for (const game of result) {
                    addLastGame(game);
                }
            }
        }
    });
}

function addLastGame(game) {
    let container = document.querySelector(".lastGames");
    let div = document.createElement('div');

    let gameIsWon = !!game.isWon;
    let gameSymbol = gameIsWon ? "+" : "-";
    let itemLossClass = gameIsWon ? "amount" : " amount-loss";
    let coinImagePath = game.coinSide == "front"
        ? "img/coin-front.png"
        : "img/coin-back.png";

    let innerHtml = `<div class="row d-flex align-items-center item">
                        <div class="col-md-4 ${itemLossClass}">${gameSymbol}${convertWeiToNas(game.amount)}</div>
                        <div class="col-md-4 d-flex justify-content-center">${convertUnixStampToScreenDate(game.date)}</div>
                        <div class="col-md-4 d-flex justify-content-end">
                            <img src="${coinImagePath}">
                        </div>
                    </div>`;

    div.innerHTML = innerHtml;
    container.append(div.firstChild);
}

function clearLastGames() {
    document.querySelector(".lastGames").innerHTML = "";
}

/* ------------------------------ */

const weiAtNas = new BigNumber(1000000000000000000);

function convertWeiToNas(value) {
    return new BigNumber(value).dividedBy(weiAtNas).toNumber();
}

function convertNasToWei(value) {
    return new BigNumber(value).multipliedBy(weiAtNas).toNumber();
}

function convertUnixStampToScreenDate(unixstamp) {
    let date = new Date(+unixstamp);
    return addZeroIfOneCharacter(date.getDate()) + "." + addZeroIfOneCharacter(date.getMonth()) + "." + date.getFullYear();
}

function addZeroIfOneCharacter(value) {
    let str = value.toString();
    return str.length == 1 ? "0" + str : str;
}

function showLoaders() {
    let loader = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = loader;
    }
}

function hideLoaders() {
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = "";
    }
}