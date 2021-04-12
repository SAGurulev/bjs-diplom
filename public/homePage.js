"use strict"

const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout(function() {
        location.reload();
    });
}
const current = ApiConnector.current (function(response) {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
function getRatesBoard() {
    ApiConnector.getStocks(function (response) {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data); 
        } 
    });
}
setTimeout(getRatesBoard);
setInterval(getRatesBoard, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, response.error + " Сумма не добавлена" );
        } else  {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Сумма добавлена");
        }
    });
}

moneyManager.conversionMoneyCallback  = data => {
    ApiConnector.convertMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, response.error + " Конвертация не проведена" );
        } else  {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, " Конвертация проведена");
        }
    });
}

moneyManager.sendMoneyCallback  = data => {
    ApiConnector.transferMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, response.error + " Средства не переведены" );
        } else  {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, " Средства переведены");
        }
    });
}

const favoritesWidget = new FavoritesWidget();
function updateFavorites(data) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(data);
    moneyManager.updateUsersList(data);
}

ApiConnector.getFavorites(response => {
    if (response.success) {
        updateFavorites(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            updateFavorites(response.data);
            favoritesWidget.setMessage(response.success, " Пользователь добавлен" );
        } else  {
            favoritesWidget.setMessage(response.success, " Пользователь не добавлен");
        }
    });
}

favoritesWidget.removeUserCallback  = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            updateFavorites(response.data);
            favoritesWidget.setMessage(response.success, " Пользователь удален" );
        } else  {
            favoritesWidget.setMessage(response.success, " Пользователь не удален");
        }
    });
}


