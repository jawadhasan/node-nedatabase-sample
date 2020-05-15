const db = require('./dbservice');

class surveyManager {

    constructor(surveyList = []) {
        this.surveyList = surveyList;
    }


    getAllInMemory() {
        return this.surveyList;
    }

    getAll() {
        const docs = db.get('surveyList')
            .value();
        return docs;
    }

    save(survey) {
        this.surveyList.push(survey);

        // Add a survey
        db.get('surveyList')
            .push(survey)
            .write();

        return survey;
    }
}
const sm = new surveyManager();
module.exports = sm;