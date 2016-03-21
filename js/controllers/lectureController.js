/**
 * Created by user on 20.3.2016 г..
 */
var app = app ||{};

app.lectureController = (function(){

    function LectureController(viewBag, model){
        this.viewBag = viewBag;
        this.model = model;
    }
    LectureController.prototype.loadAllLectures = function(selector){
        var _this = this;
        this.model.getAllLectures()
            .then(function(data){

                _this.viewBag.showAllLectures(selector, data);
            })
    };
    LectureController.prototype.loadMyLectures = function(selector){
        var currentUserId = sessionStorage["userId"];
        var _this = this;
        this.model.getMyLectures(currentUserId)
            .then(function(data){

                _this.viewBag.showAllLectures(selector, data);
            })
    };

    LectureController.prototype.loadAddLecturePage  = function(selector){
      this.viewBag.showAddLecture(selector);
    };
    LectureController.prototype.addLecture = function(data){
      this.model.addLecture(data)
          .then(function(success){
          console.log(success);
              Sammy(function(){
                  this.trigger("redirectUrl", {url:"#/calendar/my/"})
              })
      });
    };
    LectureController.prototype.loadEditPage = function(selector, id){
        var _this = this;
        this.model.getLectureByid(id)
            .then(function(success){
                console.log(success);
                _this.viewBag.showEditLecture(selector, success[0]);
            });

    };
    LectureController.prototype.editLecture = function(id, data){
        this.model.editLecture(id, data)
            .then(function(success){
                Sammy(function(){
                    this.trigger("redirectUrl", {url:"#/calendar/my/"})
                })
            });
    };
    LectureController.prototype.loadDeletePage = function(selector, id){
        var _this = this;
        this.model.getLectureByid(id)
            .then(function(success){
                console.log(success);
                _this.viewBag.showDeleteLecture(selector, success[0]);

            });

    };
    LectureController.prototype.deleteLecture = function(id){
        this.model.deleteLecture(id)
            .then(function(success){
                Sammy(function(){
                    this.trigger("redirectUrl", {url:"#/calendar/my/"})
                })
            });
    };


    return {
        load:function(viewBag, model){
            return new LectureController(viewBag, model);
        }
    }


})();
