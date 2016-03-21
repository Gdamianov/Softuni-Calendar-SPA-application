var app = app || {};

app.userViewBag = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $("#login-button").click(function(){
                var username = $("#username").val(),
                    password = $("#password").val();
                Sammy(function() {
                    this.trigger('login', {username: username, password: password});
                })
            })

        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $("#register-button").click(function(){
                var username = $("#username").val(),
                    password = $("#password").val(),
                    confirmPassword = $("#confirm-password").val();
                if(password !== confirmPassword){
                    throw new Error("Passwords are not equal!!!");
                }
                Sammy(function() {
                    this.trigger('register', {username: username, password: password});
                })

            })

        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());