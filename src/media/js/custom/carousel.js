var $citiesPrev = $('[data-cities-prev]');
var $citiesNext = $('[data-cities-next]');
var $cities = $('[data-cities]');
var TOTAL = $('[data-carousel-elem]').length;
var OFFSET = 0;
var STEP = 380;
var FULLWIDTH = TOTAL*STEP;

if($('body').width() <= 1110) {
    STEP = 222;
    FULLWIDTH = TOTAL*STEP;
}

$citiesNext.click(function(e){
    e.preventDefault();
    var getOffset = $cities.offset();

    if(OFFSET < FULLWIDTH) {
        OFFSET = OFFSET + STEP;

        if(OFFSET > FULLWIDTH) {
            OFFSET = FULLWIDTH;
        }
    } else {
        OFFSET = FULLWIDTH;
    }

    $cities.animate({
        scrollLeft: OFFSET
    }, 500);
});

$citiesPrev.click(function(e){
    e.preventDefault();
    var getOffset = $cities.offset();

    if(OFFSET > 0) {
        OFFSET = OFFSET - STEP;
    } else {
        OFFSET = 0;
    }

    $cities.animate({
        scrollLeft: OFFSET
    }, 500);
});