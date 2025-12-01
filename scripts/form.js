$(document).ready(function () {

    // Clears all of the registration form
    $("#clear").click(function () {
        if ($('#regForm')[0]) $('#regForm')[0].reset();
        $(".invalid").text("");
        $(".help").remove();
    })

    // Email validation regex (same as checkform.html)
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Validate email on focusout
    $('#email').on('focusout', function () {
        var val = $(this).val();
        if (val.match(emailRegex)) {
            $("#invalidEmail").text("");
        } else {
            $("#invalidEmail").text("Invalid email");
        }
    });

    // Clear email error on focus
    $('#email').on('focus', function () {
        $("#invalidEmail").text("");
    })

    // On submit check required inputs (.notEmpty) and email format
    $("#regForm").on('submit', function (e) {
        var error = false;

        // Check each required input marked with .notEmpty inside the form
        $(this).find('input.notEmpty').each(function () {
            var $input = $(this);
            var val = $.trim($input.val());

            // try to find a corresponding invalid span by id convention
            var span = $();
            var id = $input.attr('id') || $input.attr('name') || '';
            if (id) {
                var camel = id.replace(/[-_]+(.)?/g, function (_, c) { return c ? c.toUpperCase() : ''; });
                var cap = camel.charAt(0).toUpperCase() + camel.slice(1);
                var spanId = '#invalid' + cap;
                span = $(spanId);
            }
            if (!span || span.length === 0) {
                span = $input.siblings('.invalid').first();
            }

            if (val === '') {
                if (span && span.length) span.text('Missing Input *');
                else $input.after('<span class="invalid">Missing Input *</span>');
                error = true;
            } else {
                if (span && span.length) span.text('');
            }
        });

        // enforce email format
        var emailVal = $.trim($('#email').val());
        if (emailVal && !emailVal.match(emailRegex)) {
            $("#invalidEmail").text("Invalid email");
            error = true;
        }

        if (error) {
            e.preventDefault();
            return false;
        }

        // allow normal submit when no errors
        return true;
    });

    $("#regForm").on('reset', function (e) {
        $(".invalid").text("");
        $(".help").remove();
    })

});



