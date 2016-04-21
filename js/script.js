/* IE checker for on("input") */
var is_ie = !!navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);

/* data */
var stickertype = ['columbus', 'dreamhack','cologne','comedy','custom'];
var stickerIndex = 0;
var fonts = ["Indie Flower", "Shadows Into Light", "Pacifico", "Dancing Script",
    "Shadows Into Light Two", "Coming Soon", "Handlee", "Cookie",
    "Tangerine", "Great Vibes", "Damion", "Patrick Hand", "Bad Script",
    "Calligraffitti", "Waiting for the Sunrise", "Reenie Beanie",
    "Nothing You Could Do", "Sacramento", "Crafty Girls", "Allura",
    "Kalam", "Yellowtail", "Italianno", "Give You Glory",
    "Dawning of a New Day", "League Script", "Ruthie",
    "Lovers Quarrel", "Mrs Saint Delafield", "Mrs Sheppards",
    "Meie Script", "Princess Sofia", "Caveat", "Iceland"];
var nobg_url = getApplicationPath() + "images/nobg.png";

/* font preloading */
WebFont.load({
    google: {
        families: fonts
    },
    active: updateCanvas
});

/* element preloading */
var $bgbutton = $("#bgbutton");
var $changetype = $("#changetype");
var $clearbg = $("#clearbg");
var $color = $("#color");
var $color_pick = $("#color-pick");
var $color_preview = $("#color_preview");
var $custom_background = $("#custom-background");
var $download = $("#download");
var $font = $("#font");
var $fontsize = $("#fontsize");
var $height = $("#height");
var $name = $("#name");
var $random = $("#random");
var $rotation = $("#rotation");
var $sticker_select = $(".sticker-select");
var $teams = {};
var $update_canvas_change = $("select.update-canvas");
var $update_canvas_input = $("input.update-canvas");
var $width = $("#width");

// preload team selects based on stickertype array
for (var i = 0; i < stickertype.length; i++) {
    $teams[stickertype[i]] = $("#" + stickertype[i] + "-team");
    if (i != stickerIndex) {
        // hide all but current list
        $teams[stickertype[i]].hide();
    }
}

// hide clear background button
$clearbg.hide();

var $canvas = $("#canvas")[0];
var w = $canvas.width = 228;
var h = $canvas.height = 226;
var $context = $canvas.getContext('2d');

/* image objects */
var stickerImage = new Image();
stickerImage.src = $teams[stickertype[stickerIndex]].val();
var backgroundImage = new Image();
backgroundImage.src = nobg_url;

// If there is a filename in the path, remove it i.e. .../index.html
function getApplicationPath() {
    return (location.origin + location.pathname).replace(/[^\/]*$/, '');
}

/* main code */
function drawImageToContext(img) {
    if (img.complete && img.width > 0 && img.height > 0) {
        $context.drawImage(img, 0, 0, w, h);
    }
}

function updateCanvas() {
    var color = $color_pick.spectrum("get").toHexString().toUpperCase();
    $color.val(color);
    $color_preview.css("background", color);

    drawImageToContext(backgroundImage);
    drawImageToContext(stickerImage);

    var textString = $name.val();
    $context.save();
    $context.fillStyle = $color.val();
    $context.font = $fontsize.val() + "px " + $font.val();
    $context.translate(w * (1 - $width.val()), h * (1 - $height.val()));
    $context.rotate($rotation.val() * Math.PI / 180);
    $context.fillText(textString, -$context.measureText(textString).width / 2, $fontsize.val() / 4);
    $context.restore();
}

// handle general changes (sliders, text input)
$update_canvas_input.on("input", updateCanvas);
if (is_ie) {
    $update_canvas_input.on("change", updateCanvas);
}
$update_canvas_change.on("change", updateCanvas);

// handle color based changes
$color_pick.spectrum({
    color: "#FFFFFF",
    move: updateCanvas
});

$random.on("click", function(e) {
    $color_pick.spectrum("set", "#" + (Math.random()*0xFFFFFF<<0).toString(16));
    updateCanvas();
});

// handle background based changes
$bgbutton.on("click", function(e) {
    $custom_background.val("");
    $custom_background.click();
});

$custom_background.on("change", function(e) {
    var file;
    if ((file = this.files[0])) {
        var img = new Image();
        img.onload = function() {
            backgroundImage.src = (window.URL || window.webkitURL).createObjectURL(file);
            $clearbg.show();
            $bgbutton.hide();
            backgroundImage.onload = updateCanvas;
        };
        img.src = (window.URL || window.webkitURL).createObjectURL(file);
    }
});

$clearbg.on("click", function(e) {
    backgroundImage.src = nobg_url;
    $custom_background.val("");
    $clearbg.hide();
    $bgbutton.show();
});

// handle sticker based changes
$sticker_select.on("change", function(e) {
    stickerImage.src = $teams[stickertype[stickerIndex]].val();
    stickerImage.onload = updateCanvas;
});

$changetype.on("change", function(e) {
    stickerIndex = $changetype.val();

    for (var i = 0; i < stickertype.length; i++) {
        if (i != stickerIndex) {
            $teams[stickertype[i]].hide();
        } else {
            $teams[stickertype[i]].show();
        }
    }

    $sticker_select.change();
});

$download.on("click", function(e) {
    $download.attr("download", "DreamhackSignature.png");
    $download.attr("href", $canvas.toDataURL().replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
});

/* initial call to draw canvas on page load */
setTimeout(updateCanvas, 100);



/* banner */
$(document).ready(function() {
  var banners = $(".banner a");
  var index = 0;
  setInterval(function() {
    new TimelineLite()
      .to(banners.get(index), .75, {
        rotationX: 180,
        autoAlpha: 0
      })
      .to(banners.get(index === banners.length - 1 ? 0 : index + 1), .75, {
        rotationX: 0,
        autoAlpha: 1
      }, 0);

    index = index === banners.length - 1 ? 0 : index + 1;
  }, 4000);
});


/* Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-76755032-1', 'auto');
ga('send', 'pageview');
