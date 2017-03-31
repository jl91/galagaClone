(function () {
    var self = this;
    self.GUI = null;
    self.coins = 0;
    self.canvas = null;
    self.message = "Press enter to start";
    self.spaceShip = null;
    self.hasStarted = false;
    self.currentShootY = 0;
    self.currentShoot = 0;


    self.init = function () {
        self.canvas = document.querySelector("#main");
        self.canvas.width = window.innerWidth;
        self.canvas.height = window.innerHeight - 5;
        self.context = self.canvas.getContext('2d');
        self.oldX = self.currentX = (self.canvas.width - 10) / 2;
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

        if (key.keyCode == 39) {
            self.moveSpaceShip('right');
        }

        if (key.keyCode == 37) {
            self.moveSpaceShip('left');
        }

        if (key.keyCode == 32) {
            self.shoot();
        }
    };

    self.shoot = function () {
        var currentShootY = self.currentX - 30;
        self.drawShoot();
    };

    self.drawShoot = function () {
        self.currentShoot = self.canvas.getContext('2d');
        self.currentShoot.beginPath();
        self.currentShoot.fillStyle = 'red';
        self.currentShoot.fillRect(self.oldX + 8, self.canvas.height - 40, 5, 15);
        self.currentShoot.fill();
    };

    self.moveSpaceShip = function (moveTo) {
        self.oldX = self.currentX;
        if (moveTo == 'left') {
            self.currentX -= 20;
        }

        if (moveTo == 'right') {
            self.currentX += 20;
        }

        self.eraseSpaceship();
        self.drawSpaceship();

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

        setTimeout(function () {
            self.drawSpaceship();
        }, 1000);
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

    self.drawSpaceship = function () {
        self.spaceShip = self.canvas.getContext('2d');
        self.spaceShip.beginPath();
        self.spaceShip.fillStyle = 'black';
        self.spaceShip.fillRect(self.currentX, self.canvas.height - 20, 20, 20);
        self.spaceShip.closePath();
        self.spaceShip.fill();
    };

    self.eraseSpaceship = function () {
        self.spaceShip.beginPath();
        self.spaceShip.fillStyle = 'white';
        console.log(self.currentX);
        self.spaceShip.fillRect(self.oldX, self.canvas.height - 20, 20, 20);
        self.spaceShip.closePath();
        self.spaceShip.fill();
    };

    return {
        "init": self.init
    };

})().init();