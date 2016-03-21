/**
 * Created by user on 20.3.2016 г..
 */
var app = app || {};

(function(){

    var router = Sammy(function(){

        var selector = '#container';
        var requester = app.requester.load('kid_W1X67h4Tkb', '4894cea03af54c52a162d2a98fcdf97b', 'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var lectureViewBag = app.lectureViewBad.load();

        var userModel = app.userModel.load(requester);
        var lectureModel = app.lectureModel.load(requester);

        var homeController = app.homeController.load(homeViewBag, null);
        var userController = app.userController.load(userViewBag, userModel);
        var lectureController = app.lectureController.load(lectureViewBag, lectureModel);
        var _this =this;

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/login/');
                return false;
            }
        });

        this.before(function(){
            if(sessionStorage['username']){
                $.get('templates/menu-home.html', function(templ) {
                    var renderedData = Mustache.render(templ);
                    $("#menu").html(renderedData);
                })
            }
            else{
                $.get('templates/menu-login.html', function(templ) {
                    var renderedData = Mustache.render(templ);
                    $("#menu").html(renderedData);
                })
            }
        });



        this.get("#/", function(){
            homeController.loadWelcomePage(selector);
        });
        this.get("#/home/",function(){
            homeController.loadHomePage(selector);
        });

        //user options

        this.get("#/login/", function(){
            userController.loadLoginPage(selector);
        });
        this.get("#/register/", function(){
            userController.loadRegisterPage(selector);
        });
        this.get("#/logout/", function(){
            userController.logout();
        });
        this.get("#/calendar/list/", function(){
            lectureController.loadAllLectures(selector);
        });

        //lectures options

        this.get("#/calendar/add/", function(){
            lectureController.loadAddLecturePage(selector);
        });
        this.get("#/calendar/edit/:lectureId", function(){
            lectureController.loadEditPage(selector, this.params["lectureId"]);
        });
        this.get("#/calendar/my/", function(){
           lectureController.loadMyLectures(selector);
        });
        this.get("#/calendar/delete/:lectureId", function(){
            lectureController.loadDeletePage(selector, this.params["lectureId"]);
        });




        //Catch sammy's events
        this.bind("register", function(ev,data){
            userController.register(data);
        });
        this.bind("login", function(ev,data){
           userController.login(data);
        });
        this.bind("redirectUrl", function(ev,data){
            this.redirect(data.url);
        });
        this.bind("addLecture", function(ev, data){
            lectureController.addLecture(data);
        });
        this.bind("edit", function(ev, data){
            lectureController.editLecture(data._id, data);
        });
        this.bind("delete", function(ev, data){
            lectureController.deleteLecture(data);
        })





    });
    router.run('#/');

})();
