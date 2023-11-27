const scrollingTextElement = document.getElementById('scrollingText');
const userInputElement = document.getElementById('userInput');

// Function to append new text to the scrolling text box
function appendText(text) {
    const newMessage = document.createElement('p');
    newMessage.textContent = text;
    scrollingTextElement.appendChild(newMessage);

    // Scroll to the bottom after adding a new message
    scrollingTextElement.scrollTop = scrollingTextElement.scrollHeight;
}

// Function to handle user input when pressing Enter
function handleUserInput(event) {
    if (event.key === 'Enter') {
        submitReply();
    }
}

// Attach the event listener to the input field
userInputElement.addEventListener('keyup', handleUserInput);


// ?Sheísmo o no?
let sh = false;
// Function to handle user input
function submitReply() {
    let reply = userInputElement.value;
    userInputElement.value = ''; // Clear the input field
    reply = reply.replace(/ll/gi, 'y');
    reply = reply.replace(/gu/gi, 'w');
    reply = reply.replace(/ju/gi, 'w')
    reply = reply.replace(/qu/gi, 'k');
    reply = reply.replace(/h/gi, '');
    reply = reply.replace(/z/gi, 's');
    reply = reply.replace(/g([eiéí])/gi, 'j$1');
    reply = reply.replace(/([aeiouáéíóúü])c([eiéí])/gi, '$1s$2');
    reply = reply.replace(/s\b/g, 'j'); // o h, tbh
    reply = reply.replace(/([aeiouáéíóúü])d([aeiouáéíóúü])/gi, '$1$2');
    reply = reply.replace(/([aeiouáéíóúü])s([tpck])/gi, '$1$2');
    //reply = reply.replace(/(?<![aeiouáéíóúü])s(?![tpck])/gi, '$1$2');
    
    if (sh) {
        reply = reply.replace(/y/g, 'sh');
    }
    
    appendText(`${reply}`);
    //appendText(`You: ${reply}`);
    //appendText(`.`);
    
    // Generate and append a random numbers message
    // const randomNumbersMessage = `And so I say ${generateRandomNumbersString(10)}`;
    // appendText(randomNumbersMessage);
    
    //appendText(`You see some keyholes and keys:`);
    //appendText(`<Q: What is ${generateRandomNumbersString(10)}?>`);
}

// Function to generate a random string of numbers
function generateRandomNumbersString(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Function to handle scrolling and hide old messages
scrollingTextElement.addEventListener('scroll', function() {
    const allMessages = scrollingTextElement.querySelectorAll('p');
    const scrollingTextRect = scrollingTextElement.getBoundingClientRect();
    allMessages.forEach((message) => {
        const messageRect = message.getBoundingClientRect();
        if (messageRect.bottom < scrollingTextRect.top || messageRect.top > scrollingTextRect.bottom) {
            message.style.visibility = 'hidden';
        } else {
            message.style.visibility = 'visible';
        }
    });
});

// Execute the initial scroll event to hide messages initially
scrollingTextElement.dispatchEvent(new Event('scroll'));

if (sh) appendText("Sheísmo: una palabra por favor xoxo");
else appendText("unas plauras o frases por favo xoxo");
//appendText("You've just entered some ancient ruins.");
//appendText(`<Q: What is ${generateRandomNumbersString(10)}?>`);



function saveToLocal() {
    const data = document.getElementById('dataInput').value;
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'local_data.csv';
    link.click();
}

function downloadRemote() {
    // Assuming you have a server-side endpoint for downloading data
    // You can use fetch or any other method to download data from the server
    // Example using fetch:
    fetch('/gxb_remote_data')
        .then(response => response.text())
        .then(data => {
            const blob = new Blob([data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'remote_data.csv';
            link.click();
        });
}

function loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';

    input.addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            document.getElementById('dataInput').value = reader.result;
        };

        reader.readAsText(file);
    });

    input.click();
}

function loadFromServer() {
    // Assuming you have a server-side endpoint for fetching data
    // You can use fetch or any other method to get data from the server
    // Example using fetch:
    fetch('/gxb_remote_data')
        .then(response => response.text())
        .then(data => {
            document.getElementById('dataInput').value = data;
            const row = document.createElement('div');
            row.textContent = 'Data loaded';
            document.getElementById('responseText').appendChild(row);
        });
}

function saveToRemote() {
    const data = document.getElementById('dataInput').value;
    // Assuming you have a server-side endpoint for saving data remotely
    // You can use fetch or any other method to send data to the server
    // Example using fetch:
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
        document.getElementById('responseText').appendChild(row);
    });
}