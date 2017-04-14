(function () {
    var self = this;
    self.GUI = null;
    self.coins = 0;
    self.canvas = null;
    self.message = "Press enter to start";
    self.spaceShip = null;
    self.enemies = [];
    self.hasStarted = false;
    self.currentShootY = 0;
    self.currentShoot = 0;
    self.shoots = [];

    self.init = function () {
        self.canvas = document.querySelector("#main");
        self.canvas.width = window.innerWidth;
        self.canvas.height = window.innerHeight - 5;
        self.context = self.canvas.getContext('2d');
        self.oldX = self.currentX = (self.canvas.width - 10) / 2;
        self.drawGUI();
        self.registerEvents();
    };

    self.constructEnemies = function () {
        self.enemies = new Array(4);
        for (var i = 0; i < 4; i++) {
            self.enemies[i] = new Array(10);
        }

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 10; j++) {
                self.enemies[i][j] = {
                    'canvas': self.canvas.getContext('2d'),
                    'oldX': 0,
                    'oldY': 0
                };
            }
        }
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

        if (
            self.coins == 0 &&
            key.keyCode != 13 &&
            key.keyCode != 53
        ) {
            return;
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
        var x, y;
        y = self.canvas.height - 40;
        x = self.currentX + 8;
        self.drawShoot(x, y);
        var intervalId = setInterval(function () {
            self.eraseShoot(x, y);
            y -= 10;
            self.drawShoot(x, y);

            if (y < -10) {
                clearInterval(intervalId);
                return;
            }
        }, 10);

    };

    self.drawShoot = function (x, y) {
        self.currentShoot = self.canvas.getContext('2d');
        self.currentShoot.beginPath();
        self.currentShoot.fillStyle = 'red';
        self.currentShoot.fillRect(x, y, 5, 15);
        self.currentShoot.fill();
    };

    self.eraseShoot = function (x, y) {
        self.currentShoot.beginPath();
        self.currentShoot.fillStyle = 'white';
        self.currentShoot.fillRect(x, y, 5, 15);
        self.currentShoot.fill();
    };

    self.moveSpaceShip = function (moveTo) {
        self.oldX = self.currentX;
        if (moveTo == 'left') {
            self.currentX -= 5;
        }

        if (moveTo == 'right') {
            self.currentX += 5;
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

        setTimeout(function () {
            self.drawEnemies();
            self.moveEnemies()
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
        self.constructEnemies();
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
        self.spaceShip.fillRect(self.oldX, self.canvas.height - 20, 20, 20);
        self.spaceShip.closePath();
        self.spaceShip.fill();
    };


    self.drawEnemies = function () {
        var baseX = 50;
        var baseY = 50;

        var left = (self.canvas.width / 100) * 33.3;
        var top = self.canvas.height / 8;
        var currentTop = top;
        var currentLeft = left;

        for (var i = 0; i < 4; i++) {

            var y = currentTop + baseX * i + 50;

            for (var j = 0; j < 10; j++) {
                var x = currentLeft + baseY * j + 10;
                self.drawEnemy(x, y, i, j);
            }
        }
    };

    self.drawEnemy = function (x, y, line, column) {
        self.enemies[line][column].oldX = x;
        self.enemies[line][column].oldY = y;
        self.enemies[line][column].canvas.beginPath();
        self.enemies[line][column].canvas.fillStyle = 'green';
        self.enemies[line][column].canvas.fillRect(x, y, 20, 20);
        self.enemies[line][column].canvas.closePath();
        self.enemies[line][column].canvas.fill();
    };

    self.eraseEnemy = function (line, column) {
        var x = self.enemies[line][column].oldX;
        var y = self.enemies[line][column].oldY;

        self.enemies[line][column].canvas.beginPath();
        self.enemies[line][column].canvas.fillStyle = 'white';
        self.enemies[line][column].canvas.fillRect(x, y, 20, 20);
        self.enemies[line][column].canvas.closePath();
        self.enemies[line][column].canvas.fill();
    };

    self.moveEnemies = function () {

        var baseX = 50;
        var baseY = 50;


        setInterval(function () {

            for (var line = 3; line > 0; line--) {
                for (var column = 9; column > 0; column--) {
                    var enemy = self.enemies[line][column];

                    var x = enemy.oldX;
                    var y = enemy.oldY;

                    self.eraseEnemy(line, column);
                    self.drawEnemy(x + baseX, y, line, column);
                }
            }
        }, 500);
    };

    return {
        "init": self.init
    };

})
().init();