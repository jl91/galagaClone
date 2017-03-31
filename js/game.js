(function () {
    var self = this;
    self.canvas = null;
    self.GUI = null;
    self.hasStarted = false;
    self.message = "Press enter to start";
    self.coins = 0;

    self.init = function () {
        self.canvas = document.querySelector("#main");
        self.canvas.width = window.innerWidth;
        self.canvas.height = window.innerHeight - 5;
        self.context = self.canvas.getContext('2d');
        self.drawGUI();
        self.registerEvents();
    };

    self.keyDown = function (key) {
        console.log(key);
        if (key.keyCode == 13) {
            if (self.coins == 0) {
                alert('Insert coins, press 5');
                return;
            }

            self.eraseGUI();
        }

        if (key.keyCode == 53) {
            self.addCoins();
        }
    };

    self.addCoins = function () {
        self.coins++;
        self.eraseCoins();
        self.drawCoins();
    };

    self.registerEvents = function () {
        document.addEventListener('keydown', self.keyDown, true);
    };

    self.drawGUI = function () {
        self.GUI = self.canvas.getContext('2d');
        self.drawInitialMessage();
        self.drawCoins();
    };

    self.eraseGUI = function () {
        self.eraseInitialMessage();
    };

    self.drawInitialMessage = function () {
        var x = self.canvas.width / 2;
        var y = self.canvas.height / 2;
        self.GUI.beginPath();
        self.GUI.font = "50px Arial";
        self.GUI.fillStyle = 'grey';
        self.GUI.textAlign = 'center';
        self.GUI.fillText(self.message, x, y);
        self.GUI.fill();
    };

    self.drawCoins = function () {
        var x = 10;
        var y = 18;
        self.GUI.beginPath();
        self.GUI.font = "18px Arial";
        self.GUI.fillStyle = 'red';
        self.GUI.textAlign = 'left';
        self.GUI.fillText("Coins: " + self.coins, x, y);
        self.GUI.fill();
    };

    self.eraseCoins = function () {
        var x = 10;
        var y = 18;
        var messageLength = ("Coins: " + self.coins).length;
        self.GUI.beginPath();
        self.GUI.fillStyle = 'white';
        self.GUI.fillRect(x, 0, messageLength * x, y);
        self.GUI.fill();
    };

    self.eraseInitialMessage = function () {
        var x = self.canvas.width / 2;
        var y = self.canvas.height / 2;
        self.GUI.beginPath();
        self.GUI.fillStyle = 'white';
        self.GUI.textAlign = 'center';
        self.GUI.fillRect(x - y, y - 49, self.message.length * 50 / 2, 50);
        self.GUI.closePath();
        self.GUI.fill();
    };

    return {
        "init": self.init
    };

})().init();