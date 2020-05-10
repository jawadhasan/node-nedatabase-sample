$(document).ready(function () {

  // SUBMIT FORM
  $("#surveyForm").submit(function (event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPost();
  });

  function ajaxPost() {

    let radioValue = $('input[name=exampleRadios]:checked', '#surveyForm').val();

    // PREPARE FORM DATA
    var formData = {
      email: $("#emailId").val(),
      surveyAnswer: radioValue
    }

    // DO POST
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "api/survey/save",
      data: JSON.stringify(formData),
      dataType: 'json',
      success: function (result) {
        $("#postResultDiv").html("<p>" + 
          "Post Successfully! <br>" +
          "--->" + JSON.stringify(result)+ "</p>"); 
        console.log(result);
      },
      error: function (e) {
        alert("Error!")
        console.log("ERROR: ", e);
        resetData();
      }
    });

    // Reset FormData after Posting
    resetData();

  }

  function resetData() {
    $("#emailId").val("");
    $('#exampleRadios1').prop('checked', true);;
  }



  // GET REQUEST
  $("#getAllSurvey").click(function(event){
    event.preventDefault();
    ajaxGet();
  });

  // DO GET
  function ajaxGet(){
    $.ajax({
      type : "GET",
      url : "api/survey/all",
      success: function(result){
        $('#getResultDiv ul').empty();
        $.each(result, function(i, survey){
          $('#getResultDiv .list-group').append(survey.timestamp + " " + survey.emailAddress + " " + survey.surveyAnswer + "<br>")
        });
        console.log("Success: ", result);
      },
      error : function(e) {
        $("#getResultDiv").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
  }




//GET LowDb Result
getLowdbResultDiv
$("#getAllSurveyLowdb").click(function(event){
  event.preventDefault();
  ajaxGetLowDb();
});

//DO Get LowDb
function ajaxGetLowDb(){
  $.ajax({
    type : "GET",
    url : "api/survey/allLowdb",
    success: function(result){
      $('#getLowdbResultDiv ul').empty();
      $.each(result, function(i, survey){
        $('#getLowdbResultDiv .list-group').append(survey.id + " " + survey.timestamp + " " + survey.emailAddress + " " + survey.surveyAnswer + "<br>")
      });
      console.log("Success: ", result);
    },
    error : function(e) {
      $("#getLowdbResultDiv").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }
  }); 
}





});