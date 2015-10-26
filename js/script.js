var c = document.getElementById('canvas');
var stickertype = "dreamhack";
var w = c.width = 228;
var h = c.height = 226;
var ctx = c.getContext('2d');

var backgroundImage = new Image();
var customBackgroundImage = new Image();
var customBackgroundSource = "images/nobg.png";

backgroundImage.src = $("#" + stickertype + "-team").val();
customBackgroundImage.src = customBackgroundSource;

function DrawCustomBackground() {
    ctx.drawImage(customBackgroundImage, 0, 0, w, h);
}

function DrawScreen() {
    ctx.drawImage(backgroundImage, 0, 0, w, h);
}

function DrawText() {
    ctx.fillStyle = $("#color").val();
    var textString = $('#name').val();
    var textWidth = ctx.measureText(textString).width;
    ctx.font = $("#fontsize").val() + 'px ' + $("#font").val();
    ctx.fillText(textString, (w / $("#width").val()) - (textWidth / 2), (h / $("#height").val()));
}

setInterval(function() {
    DrawCustomBackground();
    DrawScreen();
    DrawText();
    backgroundImage.src = $("#" + stickertype + "-team").val();
    var s = $("#color-pick").spectrum("get");
    $("#color").val(s.toHexString());
    $("#color-preview").css("background", $("#color").val());
    $("#changesticker").text("Change sticker (" + stickertype + ")");
    if ($("#custom-background").val() != "") {
        customBackgroundImage.src = customBackgroundSource;
    }
}, 1);

$("#random").click(function() {
    $("#color-pick").spectrum("set", "#" + Math.random().toString(16).slice(2, 8));
});

$("#changesticker").click(function() {
    if (stickertype == "dreamhack") {
        stickertype = "cologne";
        $("#cologne-team").show();
        $("#dreamhack-team").hide();
    } else {
        stickertype = "dreamhack";
        $("#cologne-team").hide();
        $("#dreamhack-team").show();
    }
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
$("#custom-background").change(function() {
    if ((this.files[0].size / 1024).toFixed(0) > 1024) {
        alert("File too big!\nYour file: " + (this.files[0].size / 1024).toFixed(0) + "kb\nMax Allowed: 1024kb\nLarge files will cause lag on the page\nPlease resize and try again");
        $(this).val("");
    }
});

$("#clearbg").click(function(){customBackgroundSource = "images/nobg.png";});