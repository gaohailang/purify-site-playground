var styleManager = (function() {
    var rules = [];
    return {
        addRule: function(regexp, spec) {
            rules.push({
                regexp: regexp,
                spec: spec
            });
        },
        run: function() {
            var url = location.href, spec;
            rules.every(function(rule) {
                spec = rule.spec;
                // Todo: precompile regexp obj
                if(rule.regexp.test(url)) {
                    if(spec.css) {
                        require('./'+spec.css);
                    }
                    if(spec.domready) {
                        try{
                            Zepto(spec.domready);
                        }catch(e){
                            console.log(e);
                        }
                    }
                    setTimeout(function() {
                        Android.injectDone();
                    }, 300);
                    return false;
                }
                return true;
            });
        }
    }
})();

if(!window.Android) {
    window.Android = {
        injectDone: function() {}
    };
}

function linkify(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser;
}

function removeIf($dom) {
    if($dom.length) {
        $dom.remove();
    }
}

require("./base.css");
// clean body inline script tag(admaster etc)

styleManager.addRule(/mrpopat/, {
    css: 'mrpopat.css',
    domready: function() {
        // show player, detail, comments etc
        $('.middle-main-div .player_title').show().next().show().next().show();
    }
});

/* Todo */
styleManager.addRule(/metacafe/, {
    // css: 'metacafe.css',
    domready: function() {
        console.log('metacafe');
    }
});

styleManager.addRule(/dailytube/, {
    css: 'dailytube.css',
    domready: function() {
        console.log('dailytube');
    }
});

styleManager.addRule(/pagalworld/, {
    domready: function() {
        // removeIf($('div center'));
        $('.bgmenu').prev().hide();
        removeIf($('body>center'));
        // clean non-div elements for .menu/.bgmenu
        removeIf($('.menu, .bgmenu').find('script, noscript, br'));
        $('.menu .menu_row').each(function(idx, i) {
            var $i = $(i);
            var $a = $i.find('a');
            if(!$i.find('b, center').length) {
                $i.remove();
            }
            if($a.length && ($a.find('b').text().trim() == '[ Click Here ]')) {
                $i.wrap('<a>').parent().attr('href', $a.attr('href'));
                $a.remove();
            }
        });
    }
});

styleManager.addRule(/freshmaza/, {
    css: 'freshmaza.css',
    domready: function() {
        removeIf($('.content').next().find('div').not('.update, .update1')); // ads after categories
        $('.content').find('.update, .update1').each(function(idx, i) {
            var $item = $(i);
            var $a = $item.find('a');
            if($a.text() == '[Click Here]') {
                $item.wrap('<a>').parent().attr('href', $a.attr('href'));
                $a.remove();
            }
        });
    }
});

styleManager.addRule(/yumvideo/, {
    domready: function() {
        $('.content *').slice(1, $('.content h2').first().index()).remove();
    }
});

styleManager.addRule(/movievilla/, {
    css: 'movievilla.css',
    domready: function() {
        try {
            $('body').children('div').not('[align="center"]').each(function(idx, i) {
                var $i = $(i);
                var $a = $i.find('a');
                if ($a.length && $a.text().trim() === '[HERE]') {
                    $i.find('b').eq(0).wrap('<a>').parent().attr('href', $a.attr('href'));
                    $a.remove();
                }

                if ($i.find('[align="center"]').length) {
                    $i.find('[align="center"]').show();
                }

                if ($i.find('.top').length) {
                    $i.hide();
                }
            });
        } catch (e) {
            console.log(e);
        }
        // item clickable all
        // item header
        $('body p').remove();
    }
});

styleManager.addRule(/songsgig/, {
    domready: function() {
        removeIf($('.sb'));  // top ads
        removeIf($('.box>a'));
        removeIf($('body>center'));
        removeIf($('.box').has('.ql'));
        // $('.box .il').has('a>img').remove();

        $('.il.el a').each(function(idx, i) {
            var $a = $(i);
            if(linkify($a.attr('href')).hostname != 'songsgig.in') {
                $a.remove();
            }
            $a.find('font').each(function(idxx, ii) {
                var $ii = $(ii);
                if($ii.text().trim() == '[Click here]') {
                    $ii.remove();
                }
            });
        });
    }
});

styleManager.addRule(/whatsappdaily/, {
    domready: function() {

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
});

styleManager.addRule(/vimeo/, {
    css: 'vimeo.css'
});


styleManager.run();