class Survey{
    constructor(id, email, answer){
        this.id = id;
        this.email = email;
        this.answer = answer;
        this.timestamp = new Date();
    }
}

module.exports = Survey;