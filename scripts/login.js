$(document).ready(function() {
    // $("#login-alert").hide();
    $("#login-loading").hide();
    $("#login-failed").hide();

    $("#login-button").on("click", function() {
        $("#login-button").hide();
        $("#login-loading").show();
        var username = $("#username").val();
        var password = $("#password").val();

        if(username != "" && password != "") {
            $.ajax({
                url: 'login',
                type: 'POST',
                data: {
                    username: username,
                    password: password
                },
                dataType: 'json',
                success: function(cb) {
                    $("#login-button").show();
                    $("#login-loading").hide();
                    $("#login-failed").hide();
                    if(cb.success == 1) {
                        window.location.href = "/";
                    } else {
                        $("#login-failed").show();
                        $("#password").val("");
                    }
                },
                error: function(xhr, status, error) {
                    $("#login-button").show();
                    $("#login-loading").hide();
                    console.log("Error: " + xhr.responseText);
                }
            });
        } else {
            $("#login-button").show();
            $("#login-loading").hide();
        }
    });
});