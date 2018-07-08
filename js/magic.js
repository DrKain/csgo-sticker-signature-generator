$(function(){
    var ko = {};
    var $special = $("#special");
    var special = $special.get(0);
    special.width = $(window).width();
    special.height = $(window).height();
    var specialContext = special.getContext('2d');
    var joyLevel = 100;
    var flakes = {};

    ko.keys = [];
    ko.de = ["38", "38", "40", "40", "37", "39", "37", "39", "66", "65"];
    ko.nami = function() {
        if (ko.keys.toString().indexOf(ko.de.join(",")) >= 0) ko.mplete();
    };
    ko.te = setInterval(function() {
        ko.in++;
        if (ko.in > 50) ko.keys = [];
        specialContext.clearRect(0, 0, special.width, special.height);
        for(var i in flakes) flakes[i].update();
    }, 10);
    $(document).keydown(function(e) {
        ko.in = 0;
        ko.keys.push(e.keyCode);
        ko.nami();
    });
    ko.mplete = function() {
        ko.keys = [];
        flakes = {};
        for(var i = 0; i < joyLevel; i++){
            var newFlake = new snowflake(
                Math.floor(Math.random() * special.width),
                Math.floor(Math.random() * special.height)
            );
            flakes[newFlake.id] = newFlake;
        }
    };
    var snowflake = function(x,y) {
        this.id = Math.floor(Math.random() * 999999);
        this.speed = 1;
        this.x = x;
        this.y = y;
        this.xv = Math.random() > 0.5 ? 0.1 : -0.1;
        this.s = Math.floor(Math.random() * 5);
        this.a = Math.random();
        this.color = [232, 232, 232];
    };

    snowflake.prototype.draw = function() {
        specialContext.beginPath();
        specialContext.arc(this.x, this.y, this.s, 0, 2 * Math.PI, false);
        specialContext.fillStyle = "rgba(" + this.color.join(",") + ", " + this.a + ")";
        specialContext.fill();
        specialContext.closePath();
    };

    snowflake.prototype.update = function() {
        this.draw();
        this.y += this.speed;
        this.x += this.xv;
        if (this.y > special.height) {
            this.y = -5;
            this.x = Math.floor(Math.random() * special.width);
        }
    };

    $(window).resize(function() {
        special.width = $(window).width();
        special.height = $(window).height();
        specialContext = special.getContext("2d");
    });
});