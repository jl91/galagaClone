(function () {
    var self = this;
    self.canvas = null;
    self.GUI = null;
    self.hasStarted = false;
    self.message = "Press enter to start";

    self.init = function () {
        self.canvas = document.querySelector("#main");
        self.canvas.width = window.innerWidth;
        self.canvas.height = window.innerHeight - 5;
        self.context = self.canvas.getContext('2d');
        self.GUI = self.drawGUI();
        self.registerEvents();
    };

    self.keyDown = function (key) {
        console.log(key);
        if (key.keyCode == 13) {
            self.eraseGUI();
        }
    };

    self.registerEvents = function () {
        document.addEventListener('keydown', self.keyDown, true);
    };

    self.drawGUI = function () {
        var context = self.canvas.getContext('2d');
        context.font = "50px Arial";
        var x = (self.canvas.width - self.message.length * 50 / 2) / 2;
        var y = (self.canvas.height - self.message.length) / 2;
        context.fillStyle = 'grey';
        context.fillText(self.message, x, y);
        return context;
    };

    self.eraseGUI = function () {
        self.GUI.beginPath();
        self.GUI.fillStyle = '#ffffff';
        var x = (self.canvas.width - message.length * 50 / 2) / 2;
        var y = (self.canvas.height - message.length) / 2;
        self.GUI.fillText(self.message, x, y);
        self.GUI.closePath();
        self.GUI.fill();
    };

    return {
        "init": self.init
    };

})().init();