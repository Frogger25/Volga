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

    // Validate confirm email on focusout
    $('#confirm-email').on('focusout', function () {
        var val = $(this).val();
        var emailVal = $('#email').val();
        if (val !== emailVal) {
            $("#invalidConfirmEmail").text("Emails do not match");
        } else {
            $("#invalidConfirmEmail").text("");
        }
    });

    $('#confirm-email').on('focus', function () { $("#invalidConfirmEmail").text(""); })

    // Clear email error on focus
    $('#email').on('focus', function () {
        $("#invalidEmail").text("");
    })

    // First/Last name should not contain numbers
    $('#first-name, #last-name').on('focusout', function () {
        var val = $(this).val() || '';
        var id = $(this).attr('id');
        var spanId = (id === 'first-name') ? '#invalidFirstName' : '#invalidLastName';
        if (val.match(/\d/)) {
            $(spanId).text('Name cannot contain numbers');
        } else {
            $(spanId).text('');
        }
    });

    $('#first-name, #last-name').on('focus', function () {
        var id = $(this).attr('id');
        var spanId = (id === 'first-name') ? '#invalidFirstName' : '#invalidLastName';
        $(spanId).text('');
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

        // confirm email match
        var confirmEmailVal = $.trim($('#confirm-email').val());
        if (emailVal !== confirmEmailVal) {
            $("#invalidConfirmEmail").text("Emails do not match");
            error = true;
        }

        // first and last name should not contain digits
        var firstNameVal = $.trim($('#first-name').val());
        var lastNameVal = $.trim($('#last-name').val());
        if (firstNameVal.match(/\d/)) { $("#invalidFirstName").text('Name cannot contain numbers'); error = true; }
        if (lastNameVal.match(/\d/)) { $("#invalidLastName").text('Name cannot contain numbers'); error = true; }

        // password checks
        var pwd = $.trim($('#password').val());
        var pwdConfirm = $.trim($('#confirm-password').val());
        if (!pwd) {
            $("#invalidPassword").text('Missing Input *'); error = true;
        } else if (pwd.length < 8) {
            $("#invalidPassword").text('Password must be at least 8 characters'); error = true;
        } else {
            $("#invalidPassword").text('');
        }
        if (pwd !== pwdConfirm) {
            $("#invalidConfirmPassword").text('Passwords do not match'); error = true;
        } else {
            if ($('#confirm-password').val()) $("#invalidConfirmPassword").text('');
        }

        // zip code basic check (5 digits or 5-4)
        var zip = $.trim($('#zip').val());
        if (zip && !zip.match(/^\d{5}(-\d{4})?$/)) {
            $("#invalidZip").text('Invalid zip code'); error = true;
        }

        // card number basic numeric check and Luhn
        var cardNumber = $.trim($('#card-number').val()).replace(/\s+/g, '');
        if (!cardNumber.match(/^\d{13,19}$/)) {
            $("#invalidCardNumber").text('Invalid card number'); error = true;
        } else {
            // Luhn check
            function luhnCheck(num) {
                var sum = 0; 
                var alt = false;
                for (var i = num.length - 1; i >= 0; i--) {
                    var n = parseInt(num.charAt(i), 10);
                    if (alt) {
                        n *= 2;
                        if (n > 9) n -= 9;
                    }
                    sum += n;
                    alt = !alt;
                }
                return (sum % 10) === 0;
            }
            if (!luhnCheck(cardNumber)) {
                $("#invalidCardNumber").text('Invalid card number'); error = true;
            } else {
                $("#invalidCardNumber").text('');
            }
        }

        // card holder
        if (!$.trim($('#card-holder').val())) { $("#invalidCardHolder").text('Missing Input *'); error = true; } else { $("#invalidCardHolder").text(''); }

        // expiration date check
        var expMonth = parseInt($('#exp-month').val(), 10);
        var expYear = parseInt($('#exp-year').val(), 10);
        if (!expMonth || !expYear) {
            if (!expMonth) $("#invalidExpMonth").text('Select month');
            if (!expYear) $("#invalidExpYear").text('Select year');
            error = true;
        } else {
            var now = new Date();
            var thisMonth = now.getMonth() + 1;
            var thisYear = now.getFullYear();
            if (expYear < thisYear || (expYear === thisYear && expMonth < thisMonth)) {
                $("#invalidExpYear").text('Card expired'); error = true;
            } else {
                $("#invalidExpMonth").text(''); $("#invalidExpYear").text('');
            }
        }


        if (error) {
            e.preventDefault();
            return false;
        }

        // Show success modal instead of normal submit
        e.preventDefault();
        var $modal = $('#successModal');
        if ($modal && $modal.length) {
            $modal.addClass('show');
        }
        return false;
    });

    $("#regForm").on('reset', function (e) {
        $(".invalid").text("");
        $(".help").remove();
    })

    // Modal close handlers
    $('.close-modal, .modal-close-btn').on('click', function () {
        var $modal = $('#successModal');
        if ($modal) $modal.removeClass('show');
    });

    // Close modal if clicking outside the content
    $('#successModal').on('click', function (e) {
        if (e.target === this) {
            $(this).removeClass('show');
        }
    });

});

// Populate expiration year options on load (next 12 years)
$(function () {
    var $year = $('#exp-year');
    if ($year && $year.length) {
        var now = new Date();
        var y = now.getFullYear();
        for (var i = 0; i < 12; i++) {
            $year.append($('<option>', { value: y + i, text: y + i }));
        }
    }
});



