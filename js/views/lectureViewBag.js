var app = app || {};

app.lectureViewBad = (function(){

    function showAllLectures(selector, data){
        $.get("templates/calendar.html", function(template){
            var renderedData = Mustache.render(template);
            $(selector).html(renderedData);
            data.forEach(function(lecture){
                if(lecture.author != sessionStorage["username"]){
                    $("#editLecture").hide();
                    $("#deleteLecture").hide();
                    console.log(lecture.author == sessionStorage["username"])
                }
            });

            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function(){
                                this.trigger("redirectUrl",{url:"#/calendar/add/"});
                            })
                        }
                    }
                },

                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function() {
                            var selectedLecture = $("#editLecture").parent().prev();
                            var id = $(selectedLecture).children().attr("lecture-id");
                            var lecture = data.filter(function(lecture){
                                return lecture._id == id;
                            });
                            Sammy(function(){
                                this.trigger("redirectUrl", {url:"#/calendar/edit/"+id});
                            })
                        });
                        $('#deleteLecture').on('click', function() {
                            var selectedLecture = $("#deleteLecture").parent().prev();
                            var id = $(selectedLecture).children().attr("lecture-id");
                            var lecture = data.filter(function(lecture){
                                return lecture._id == id;
                            });
                            Sammy(function(){
                                this.trigger("redirectUrl", {url:"#/calendar/delete/"+id});
                            })
                        })
                    });
                    $('#events-modal').modal();

                }
            });


        });



    }
    function showAddLecturePage(selector){
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);
            $("#addLecture").click(function(){
                var title = $("#title").val(),
                    start = $("#start").val(),
                    end = $("#end").val(),
                    author = sessionStorage["username"]
                Sammy(function() {
                    this.trigger('addLecture', {title:title, start:start, end:end, author:author});
                })
            })


        });
    }
    function showEditLecturePage(selector, data){
        $.get("templates/edit-lecture.html", function(templ){
           var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
            console.log(data);
            $("#editLecture").click(function(){
                var title = $("#title").val(),
                    start = $("#start").val(),
                    end = $("#end").val();
                Sammy(function(){
                    this.trigger("edit", {title:title,_id:data._id, start:start, end:end, author:data.author});
                })
            })
        });
    }
    function showDeleteLecturePage(selector, data){
        $.get("templates/delete-lecture.html", function(templ){
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
            console.log(data);
            $("#deleteLecture").click(function(){

                Sammy(function(){
                    this.trigger("delete", data._id);
                })
            })
        });
    }


    return {
        load: function () {
            return {
                showAllLectures: showAllLectures,
                showAddLecture:showAddLecturePage,
                showEditLecture: showEditLecturePage,
                showDeleteLecture:showDeleteLecturePage
            }
        }
    }
})();