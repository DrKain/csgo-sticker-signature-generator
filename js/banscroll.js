// Function to Randomize the position of the banners

$.fn.randomize = function(childElem) {
    return this.each(function() {
        var $this = $(this);
        var elems = $this.children(childElem);
        elems.sort(function() { return (Math.round(Math.random())-0.5); });
        $this.remove(childElem);
        for(var i=0; i < elems.length; i++)
            $this.append(elems[i]);
    });
};

// Banner Controller

$(function() {

    // Start by randomizing the banner order

    $(".banners").randomize('a.item');

    // Get the first banner, Set as active then hide the rest

    var bFirst = $(".banners .item:first");
    bFirst.addClass('active');

    $(".banners .item:not(.active)").hide();

    // Variable to disable / enable banner changing
    var cycle = true;

    // Animation Speed
    var bSpeed = 500;
    // Timer between banners
    var bInterval = 10000;

    // Change banner every 10 seconds
    var bTick = setInterval(function() {
        if (cycle === true) nextBan();
    }, bInterval);

    // Next banner function
    var nextBan = function() {
        var $wrap = $(".banners");
        var bActive = $(".banners .item.active");
        var bNext = bActive.next(".item");

        // If last banner reached set it to the first
        if (bNext.length === 0) bNext = bFirst;

        // Animation Options
        var bOption = { top: "-=" + $wrap.height() };

        // Animate the current and previous banners
        bActive.removeClass("active").animate(bOption, bSpeed);
        bNext
            .show()
            .addClass("active")
            .css("top", $wrap.height())
            .animate(bOption, bSpeed);
    };

    // Mouse events to pause banner scrolling when hovering
    $(".banners .item").on({
        mouseenter: function() {
            cycle = false;
        },
        mouseleave: function() {
            cycle = true;
        }
    });
});
