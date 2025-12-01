$(document).ready(function () {
    function showHelp($el, msg) {
        // Prefer a help element uniquely tied to this input (by id)
        var id = $el.attr('id');
        var $help = $();
        if (id) {
            $help = $('#help-' + id);
        }
        if (!$help || $help.length === 0) {
            $help = $('<span>').addClass('help').css({display: 'block', color: '#666', 'font-size': '0.9em'});
            if (id) $help.attr('id', 'help-' + id);
            // Insert after the invalid span for this field if present, otherwise after the input
            var $invalid = $el.nextAll('.invalid').first();
            if ($invalid && $invalid.length) {
                $invalid.after($help);
            } else {
                $el.after($help);
            }
        }
        $help.text(msg);
    }

    function clearHelp($el) {
        var id = $el.attr('id');
        var $help = $();
        if (id) $help = $('#help-' + id);
        if (!$help || $help.length === 0) {
            $help = $el.nextAll('.help').first();
        }
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

    // Confirm email
    $('#confirm-email').on('focus', function () {
        showHelp($(this), 'Re-enter the email address to confirm.');
    }).on('blur', function () { clearHelp($(this)); });

    // Password and confirm password
    $('#password').on('focus', function () {
        showHelp($(this), 'Password should be at least 8 characters.');
    }).on('blur', function () { clearHelp($(this)); });

    $('#confirm-password').on('focus', function () {
        showHelp($(this), 'Re-enter the password for confirmation.');
    }).on('blur', function () { clearHelp($(this)); });

    // Address fields
    $('#address').on('focus', function () { showHelp($(this), 'Street address (e.g., 123 Main St)'); }).on('blur', function () { clearHelp($(this)); });
    $('#address2').on('focus', function () { showHelp($(this), 'Apt, suite, unit, building, floor (optional)'); }).on('blur', function () { clearHelp($(this)); });
    $('#city').on('focus', function () { showHelp($(this), 'Enter the city'); }).on('blur', function () { clearHelp($(this)); });
    $('#state').on('focus', function () { showHelp($(this), 'Select your state'); }).on('blur', function () { clearHelp($(this)); });
    $('#zip').on('focus', function () { showHelp($(this), 'Enter 5-digit ZIP or ZIP+4'); }).on('blur', function () { clearHelp($(this)); });

    // Payment fields
    $('#card-type').on('focus', function () { showHelp($(this), 'Select the card brand'); }).on('blur', function () { clearHelp($(this)); });
    $('#card-number').on('focus', function () { showHelp($(this), 'Enter card number without spaces'); }).on('blur', function () { clearHelp($(this)); });
    $('#card-holder').on('focus', function () { showHelp($(this), 'Name exactly as on card'); }).on('blur', function () { clearHelp($(this)); });
    $('#exp-month').on('focus', function () { showHelp($(this), 'Expiration month'); }).on('blur', function () { clearHelp($(this)); });
    $('#exp-year').on('focus', function () { showHelp($(this), 'Expiration year'); }).on('blur', function () { clearHelp($(this)); });

});