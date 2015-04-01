/* Tood:
    addRule(UrlRexp, handler)

    extend vein -> vein.hide(cssSelector)
*/

vein.inject('h2', {
    'color': 'red!important'
});
vein.inject('.ad-inlist', {
    'display': 'none;important'
});

if (location.href.indexOf('whatsappdaily.com') > -1) {
    $('#mainDiv').children().each(function(idx, i) {
        console.log(i.className);
        if (!i.className) {
            $(i).remove();
        }
        if ('search, devider, featured, catRow, ad1'.indexOf(i.className) == -1) {
            if (i.id === 'category') return;
            console.log(i);
            $(i).remove();
        }
    });
}

if (location.href.indexOf('vimeo') > -1) {
    vein.inject('.jumbo', {
        display: 'none'
    });
}

if (location.href.indexOf('movievilla') > -1) {
    vein.inject('[align="center"]', {
        display: 'none'
    });
    vein.inject('[align="center"]:first-child', {
        display: 'block'
    });
    vein.inject('img', {
        'max-width': '100%',
        'max-height': '100%'
    });
    vein.inject('.M1 a', {
        'word-wrap': 'break-word'
    });
    $('body').children('div').not('[align="center"]').each(function(idx, i) {
        var $i = $(i);
        var $a = $i.find('a');
        if ($a.length && $a.text().trim() === '[HERE]') {
            $i.find('b').eq(0).wrap('<a>').parent().attr('href', $a.attr('href'));
            $a.remove();
        }
    });
    // item clickable all
    // item header
    $('body p').remove();
}