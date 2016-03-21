var app = app ||{};

app.lectureModel = (function(){

    function LectureModel(requester){
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
    }
    LectureModel.prototype.getAllLectures = function(){
        return this.requester.get(this.serviceUrl, true);
    };
    LectureModel.prototype.addLecture = function(data){
        return this.requester.post(this.serviceUrl, data, true);
    };
    LectureModel.prototype.editLecture = function(lectureId,data){
        var requestUrl = this.serviceUrl + lectureId;
        return this.requester.put(requestUrl, data, true);
    };
    LectureModel.prototype.deleteLecture = function(lectureId){
        var requestUrl = this.serviceUrl + lectureId;
        return this.requester.delete(requestUrl, true);
    };
    LectureModel.prototype.getLectureByid = function(id){
        var url = this.serviceUrl +'?query={"_id":"'+id + '"}';
        return this.requester.get(url, true);
    };
    LectureModel.prototype.getMyLectures = function(createrid){
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"'+ createrid + '"}';
        return this.requester.get(requestUrl, true);
    }



    return {
        load:function(requester){
            return new LectureModel(requester);
        }
    }

})();
