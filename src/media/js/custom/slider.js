var $slide = $('[data-slide]');
var currentSlide = 1;

$slide.each(function(element) {
    var $this = $(this);
    var slideImage = $this.attr('data-slide-image');
    var slideCount = $this.attr('data-slide');

    TweenMax.set($this, {background: 'url("media/img/'+ slideImage +'") no-repeat center', backgroundSize: 'cover'});

    if(slideCount > 1) {
        TweenMax.set($this, {autoAlpha: 0});
    }
});

$('[data-slider-next]').click(function(e){
    e.preventDefault();
    var $getCurrentSlide = $slide.filter('[data-slide="' + currentSlide + '"]');
    currentSlide++;
    if(currentSlide > $slide.length) {
        currentSlide = 1;
    }
    var $getNextSlide = $slide.filter('[data-slide="'+ currentSlide +'"]');

    TweenMax.to($getCurrentSlide, 1, {autoAlpha: 0});
    TweenMax.to($getNextSlide, 1, {autoAlpha: 1, delay: 0.3});
});

$('[data-slider-prev]').click(function(e){
    e.preventDefault();
    var $getCurrentSlide = $slide.filter('[data-slide="' + currentSlide + '"]');
    currentSlide--;
    if(currentSlide == 0) {
        currentSlide = $slide.length;
    }
    var $getNextSlide = $slide.filter('[data-slide="'+ currentSlide +'"]');

    TweenMax.to($getCurrentSlide, 1, {autoAlpha: 0});
    TweenMax.to($getNextSlide, 1, {autoAlpha: 1, delay: 0.5});
});