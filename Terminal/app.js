const terminal = document.getElementById("terminal");
let textInputs = document.querySelectorAll(".answer");

let inputIsDone = false;
let lastSession = false;

function createQuestionAndAnswer() {
    const question = document.createElement("p");
    question.textContent = "Type your name: ";
    question.classList.add("question");
    const newTextInput = document.createElement("div");
    newTextInput.setAttribute("contenteditable", true);
    newTextInput.classList.add("answer");
    const questionAndAnswer = document.createElement("div");
    questionAndAnswer.classList.add("questionAndAnswer");
    questionAndAnswer.appendChild(question);
    questionAndAnswer.appendChild(newTextInput);
    terminal.appendChild(questionAndAnswer);

    newTextInput.addEventListener("blur", () => {
        inputIsDone = true;
    });

    newTextInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            inputIsDone = true;
        }
    });

    textInputs = document.querySelectorAll(".answer");
};
createQuestionAndAnswer();

function inputReadinessCheck() {
    return new Promise(resolve => {
        const checkInputReadiness = () => {
            if (inputIsDone) {
                resolve();
            } else {
                setTimeout(checkInputReadiness, 100);
            };
        };
        checkInputReadiness();
    });
};

function checkNameInput() {
    textInputs[textInputs.length-1].setAttribute("contenteditable", false);
    if (textInputs[textInputs.length-1].textContent.replace(/\s+/g, '').toLowerCase() === "lena") {
        const warning = document.createElement("p");
        warning.textContent = 'Warning! Your level of "love for others" is too high.';
        warning.classList.add("warning");
        const space = document.createElement("br");
        const secretKey = document.createElement("p");
        secretKey.innerHTML = `Here is your secter key:<br>
        Note C is letter "a",<br>
        note D is letter "b",<br>
        note E is letter "c",<br>
        note F is letter "d",<br>
        and so on until note B<br>
        <br>
        If there is a note A in the bass clef, then it makes a 7-letter raise, so if there is a note C in the treble clef, and there is a note A in the bass clef, then you count seven letters after the letter "a", and it turns out the letter "h"<br>
        <br>
        The same works with the note B and C in the bass clef, only if the note is B in the bass clef, then the elevation is 14 letters, and if the note C then the elevation is 21 letters<br>
        <br>
        For example, let's decode this notes( [ treble clef note, bass clef note ] ):<br>
        [ C, A ] [ G, - ] [ G, A ] [ G, A ] [ C, B ]<br>
        First letter: Count 7th letter after "a"  "a", "b", "c", "d", "e", "f", "g", "h" out letter is "h"<br>
        Second letter: 5th letter in alphabet is "e"<br>
        Third letter: Count 11th letter after "a"  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", out letter is "l"<br>
        Fourth letter: The same as last note<br>
        Fifth letter: Count 14th letter after "a", out letter is "o"<br>
        So our word is "hello"`;
        terminal.appendChild(warning);
        terminal.appendChild(space);
        terminal.appendChild(secretKey);
    } else if (textInputs[textInputs.length-1].textContent.replace(/\s+/g, '').toLowerCase() === "godiswithme") {
        const HBlink = document.createElement("a");
        HBlink.textContent = "https://www.bible.com/";
        HBlink.setAttribute("href", "https://www.bible.com/");
        terminal.appendChild(HBlink);
        lastSession = true;
    } else if (textInputs[textInputs.length-1].textContent.replace(/\s+/g, '').toLowerCase() === "bogdan") {
        const todoList = document.createElement("p");
        todoList.innerHTML = "Todo: <br>&nbsp; 1. Buy a car <br>&nbsp; 2. Buy a house <br>&nbsp; 3. Buy tickets for Компашка to America";
        terminal.appendChild(todoList);
    } else {
        const notFound = document.createElement("span");
        notFound.textContent = "Name not found. ";
        notFound.classList.add("notFound");
        const nameLookLike = document.createElement("span");
        nameLookLike.textContent = 'Your name should look like "Sofia", "Zahar"...';
        nameLookLike.classList.add("nameLookLike");
        const result = document.createElement("p");
        result.appendChild(notFound);
        result.appendChild(nameLookLike);
        terminal.appendChild(result);
    }
    if (!lastSession) {
        const space = document.createElement("br");
        terminal.appendChild(space);
        createQuestionAndAnswer();
    }
    return new Promise(resolve => setTimeout(resolve, 100));
};

async function checkingNameInput() {
    while (!lastSession) {
        await inputReadinessCheck();
        await checkNameInput();
        inputIsDone = false;
    }
};

checkingNameInput();