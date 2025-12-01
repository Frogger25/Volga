$(document).ready(function () {
    // Displays message when email is clicked
    $("#email").click(function () {
    	// Your jQuery goes here
    })
    function showHelp($el, msg) {
        var $help = $el.siblings('.help').first();
        if (!$help || $help.length === 0) {
            $help = $('<span>').addClass('help').css({display: 'block', color: '#666', 'font-size': '0.9em'});
            $el.after($help);
        }
        $help.text(msg);
    }

    function clearHelp($el) {
        var $help = $el.siblings('.help').first();
        if ($help && $help.length) $help.text('');
    }

    // Email hints
    $("#email").on('focus', function () {
        showHelp($(this), 'Enter a valid email address (e.g., user@example.com)');
    }).on('blur', function () {
        clearHelp($(this));
    });

    // First name hints (supports both id variants)
    $("#first-name, #firstName").on('focus', function () {
        showHelp($(this), 'Enter your first name');
    }).on('blur', function () {
        clearHelp($(this));
    });

    // Last name hints
    $("#last-name, #lastName").on('focus', function () {
        showHelp($(this), 'Enter your last name');
    }).on('blur', function () {
        clearHelp($(this));
    });

});