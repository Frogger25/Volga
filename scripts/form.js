$(document).ready(function () {

    // Clears all of the registration form
    $("#clear").click(function () {
        $('#regForm')[0].reset();
        $(".invalid").text("");
    })

    // Email must be an email...  .on() maybe?

    // If email input is clicked remove span message

    // Checks if email and confirmation email are similar...  .on() maybe?

    // If confirm email input is clicked remove span message

    // Password can only have upper and/or numbers...   .on() maybe?

    // If password input is clicked remove span message

    // Checks if passWord and confirmPassword are the same

	// Etc., etc., etc...

    // On submit do these things
    $("#regForm").submit(function (e) {
    	// This is a bit more complicated... Here is an algorithm...
    	// It is not 100% complete but give you the general idea.
    	//
        // error variable to check if there are Errors
        // Count to check each input
        // Use .each() to go through all of the input elements of the form
    	//     If the value at the input has nothing in the text field
        //         Place text in span[n]
        // 	       Increase count by 1
        //     else 
        //         replace span with empty string
        //         Increase count by 1
    });
});



