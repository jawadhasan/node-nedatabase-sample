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
        // $('#getResultDiv ul').empty();
        // var custList = "";
        // $.each(result, function(i, customer){
        //   $('#getResultDiv .list-group').append(customer.firstname + " " + customer.lastname + "<br>")
        // });
        console.log("Success: ", result);
      },
      error : function(e) {
        // $("#getResultDiv").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
  }


});