const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout(function() {
        location.reload();
    });
}
const current = ApiConnector.current (function(callback) {
    if (ApiConnector.current === true) {
        ProfileWidget.showProfile;
    }
});

const ratesBoard = new RatesBoard();
function getRatesBoard(data) {
    ApiConnector.getStocks(function (data) {
        if (response.success === "true") {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data); 
        } 
    })
}
setTimeout(getRatesBoard);
setInterval(getRatesBoard, 60000);


