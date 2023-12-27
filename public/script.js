
/* Aii */
function getAii() {

    qav = document.getElementById('qav');
    title = "Title: " + qav.getElementsByTagName('textarea')[0].value + "\n\n\n";

    otb = document.getElementById('otb');
    otbRizList = Array.from(otb.getElementsByClassName('riz'));
    dbq = document.getElementById('dbq');
    dbqRizList = Array.from(dbq.getElementsByClassName('riz'));

    rizList = otbRizList.concat(dbqRizList);

    rizzes = "";
    for (i in rizList) {
        rizQuestion = "Question: " + rizList[i].getElementsByTagName('p')[0].textContent;
        rizAnswer = "Answer: " + rizList[i].getElementsByTagName('textarea')[0].value;
        rizzes += rizQuestion + "\n" + rizAnswer + "\n\n";
    }

    gxbText = "\nMiscellaneous Remarks: " + document.getElementById('gxbDataInput').value + "\n";

    concatText = title + rizzes + gxbText;

    return concatText;
}

function setAii(aiiInput) {
    document.getElementById('gxbDataInput').value = aiiInput;
}

/* Gxb */
function saveToLocal() {
    const data = getAii();
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'local_data.csv';
    link.click();
}

function loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';

    input.addEventListener('change', function () {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            //document.getElementById('gxbDataInput').value = reader.result;
            setAii(reader.result);
        };

        reader.readAsText(file);
    });

    input.click();
}

function loadFromServer() {
    fetch('/gxb_remote_data')
        .then(response => response.text())
        .then(data => {
            setAii(data);
            const row = document.createElement('div');
            row.textContent = 'Data loaded';
            document.getElementById('gxbResponseText').appendChild(row);
        });
}

function saveToRemote() {
    /*const data = document.getElementById('gxbDataInput').value;*/
    const data = getAii();
    
    fetch('/gxb_remote_data', {
        method: 'POST',
        /*
        headers: {
            "Content-Type": "text/csv"
        },
        //*/
        body: data//'test-str-r'//data//JSON.stringify(data)
    })
        .then(response => response.text())
        .then(result => {
            //document.getElementById('responseText').textContent += ' ' + result;
            const row = document.createElement('div');
            row.textContent = result;
            document.getElementById('gxbResponseText').appendChild(row);
        });
}

window.onload = function () {
    otber();
    dbqer();
};

function otber() {
    prompts = ["What did you do today?",
        "How did you feel?",
        "When did you sleep?"];
    for (promptIndex in prompts) {
        promptQuestionAndAnswerDiv = document.createElement('div');
        promptQuestionAndAnswerDiv.className += "riz";
        promptQuestion = document.createElement('p');
        promptQuestion.textContent = prompts[promptIndex];
        promptAnswer = document.createElement('textarea');
        promptQuestionAndAnswerDiv.appendChild(promptQuestion);
        promptQuestionAndAnswerDiv.appendChild(promptAnswer);
        document.getElementById('otb-gwd').appendChild(promptQuestionAndAnswerDiv);
    }
}

function dbqer() {
    prompts = ["How was the weather?",
        "What did you learn?",
        "Any remarks?"];
    for (promptIndex in prompts) {
        promptQuestionAndAnswerDiv = document.createElement('div');
        promptQuestionAndAnswerDiv.className += "riz";
        promptQuestion = document.createElement('p');
        promptQuestion.textContent = prompts[promptIndex];
        promptAnswer = document.createElement('textarea');
        promptQuestionAndAnswerDiv.appendChild(promptQuestion);
        promptQuestionAndAnswerDiv.appendChild(promptAnswer);
        document.getElementById('dbq-gwd').appendChild(promptQuestionAndAnswerDiv);
    }
}