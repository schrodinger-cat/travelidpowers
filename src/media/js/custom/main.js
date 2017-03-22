var $menuOpener = $('[data-menu-opener]');

$menuOpener.click(function(e){
    e.preventDefault();

    var $this = $(this);
    var $menu = $('[data-menu]');
    var $body = $('body');

    if($this.hasClass('_close')) {
        $this.removeClass('_close').addClass('_open');
        $body.addClass('_noscroll');

        TweenMax.to(
            $('[data-menu]'), 1.5,
            {height: '100%', ease: Bounce.easeOut}
        );
    } else {
        $this.removeClass('_open').addClass('_close');
        $body.removeClass('_noscroll');

        TweenMax.to(
            $('[data-menu]'), 0.5,
            {height: 0}
        );
    }
});