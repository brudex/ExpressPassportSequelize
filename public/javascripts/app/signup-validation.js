$().ready(function() {
    // validate the form when it is submitted
    var validator = $("form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            $( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );
        },
        errorElement: "small",
        errorClass: "error",
        rules: {
            confirm: {
                equalTo: "#password"
            }
        },
        messages: {
            email: {
                required: " (required)"
            }, first_name: {
                required: " (required)"
            },
            last_name: {
                required: " (required)"
            },
            mobile: {
                required: " (required)"
            },
            heardabout: {
                required: " (required)"
            },
            password: {
                required: " (required)",
                minlength: " (must be at least 7  characters)"

            },
            confirm: {
                required: " (required)",
                equalTo: " Password confirmation does not match"

            }
        }
    });

    $(".cancel").click(function() {
        validator.resetForm();
    });
});