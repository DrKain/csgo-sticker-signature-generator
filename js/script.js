var c = document.getElementById('canvas');
var stickertype = ['dreamhack','cologne','comedy','custom'];
var stickerIndex = 0;
var w = c.width = 228;
var h = c.height = 226;
var ctx = c.getContext('2d');

var backgroundImage = new Image();
var customBackgroundImage = new Image();
var customBackgroundSource = "images/nobg.png";

backgroundImage.src = $("#" + stickertype[stickerIndex] + "-team").val();
customBackgroundImage.src = customBackgroundSource;

$("#dreamhack-team").hide();
$("#cologne-team").hide();
$("#comedy-team").hide();
$("#custom-team").hide();
$("#" + stickertype[stickerIndex] + "-team").show();
    
function DrawCustomBackground() {
    ctx.drawImage(customBackgroundImage, 0, 0, w, h);
}

function DrawScreen() {
    if (backgroundImage.complete && backgroundImage.width > 0 && backgroundImage.height > 0) {
        ctx.drawImage(backgroundImage, 0, 0, w, h);
    }
}

function DrawText() {
    ctx.save();
    ctx.fillStyle = $("#color").val();
    var textString = $('#name').val();
    var textWidth = ctx.measureText(textString).width;
    var translateX = w * (1 - $("#width").val());
    var translateY = h * (1 - $("#height").val());
    ctx.font = $("#fontsize").val() + 'px ' + $("#font").val();
    ctx.translate(translateX, translateY);
    ctx.rotate($('#rotation').val() * Math.PI / 180);
    ctx.fillText(textString, -ctx.measureText(textString).width / 2, $("#fontsize").val() / 4);
    ctx.restore();
}

setInterval(function() {
    DrawCustomBackground();
    DrawScreen();
    DrawText();
    backgroundImage.src = $("#" + stickertype[stickerIndex] + "-team").val();
    var s = $("#color-pick").spectrum("get");
    $("#color").val(s.toHexString());
    $("#color-preview").css("background", $("#color").val());
    $("#changesticker").text("Change sticker (" + stickertype[stickerIndex] + ")");
    if ($("#custom-background").val() != "") {customBackgroundImage.src = customBackgroundSource;}
	if(customBackgroundSource != "images/nobg.png"){
        $("#clearbg").show();
        $("#bgbutton").hide();
    } else {
        $("#clearbg").hide();
        $("#bgbutton").show();
    }
}, 1);

$("#random").click(function() {
    $("#color-pick").spectrum("set", "#" + Math.random().toString(16).slice(2, 8));
});

$("#changesticker").click(function() {
    if(stickerIndex >= stickertype.length-1){
		stickerIndex = 0;
	} else {
		stickerIndex++;
	}
    $("#dreamhack-team").hide();
    $("#cologne-team").hide();
    $("#comedy-team").hide();
    $("#custom-team").hide();
    $("#" + stickertype[stickerIndex] + "-team").show();

});

$("#download").click(function() {
    var myCanvas = $(document).find('#canvas');
    var img = myCanvas.get(0).toDataURL();
    var url = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    $("#download").attr("download", "DreamhackSignature.png");
    $("#download").attr("href", url);
});

$("#color-pick").spectrum({
    color: "#FFFFFF"
});

function el(id) {
    return document.getElementById(id);
}

function readImage() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function(e) {
            customBackgroundSource = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
    }
};
el("custom-background").addEventListener("change", readImage, false);
$("#custom-background").click(function() {
    $(this).val("");
});

var _URL = window.URL || window.webkitURL;
$("#custom-background").change(function(e) {
    var file, img;
    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function () {
            if(this.width > 288 || this.height > 288){
                $("#custom-background").val("");
                customBackgroundSource = "images/nobg.png";
                alert("File too big! Max size: 288x288");
            }
        };
        img.src = _URL.createObjectURL(file);
    }
});

$("#clearbg").click(function(){customBackgroundSource = "images/nobg.png";});
