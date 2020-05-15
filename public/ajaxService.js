var ajaxService = function(){

    //'api/survey/getAll'

    let serviceBase = 'api/';

    function getAll(controller){
        return $.getJSON(serviceBase + controller + '/getAll');
    }

    function getInMemory(controller){
        return $.getJSON(serviceBase + controller + '/getInMemory');
    }

    //public API
    return {
        getAll: getAll,
        getInMemory:getInMemory

    }

}();