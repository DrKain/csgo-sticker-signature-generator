var c = document.getElementById('canvas');
var stickertype = "dreamhack";
var w = c.width = 228;
var h = c.height = 226;
var ctx = c.getContext('2d');
var backgroundImage = new Image();
backgroundImage.setAttribute('crossOrigin', 'anonymous');
backgroundImage.onload = function() {
    DrawScreen();
    DrawText();
};

backgroundImage.src = $("#" + stickertype + "-team").val();

function DrawScreen() {
    var pattern = ctx.createPattern(backgroundImage, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, c.width, c.height);
}

function DrawText() {
    ctx.fillStyle = $("#color").val();
    var textString = $('#name').val();
    var textWidth = ctx.measureText(textString).width;
    ctx.font = $("#fontsize").val() + 'px ' + $("#font").val();
    ctx.fillText(textString, (w / $("#width").val()) - (textWidth / 2), (h / $("#height").val()));
}

setInterval(function() {
    DrawScreen();
    DrawText();
    backgroundImage.setAttribute('crossOrigin', 'anonymous');
    backgroundImage.src = $("#" + stickertype + "-team").val();
    var s = $("#color-pick").spectrum("get");
    $("#color").val(s.toHexString());
    $("#color-preview").css("background", $("#color").val());
    $("#changesticker").text("Change sticker (" + stickertype + ")");
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
