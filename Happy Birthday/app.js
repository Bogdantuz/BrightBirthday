import { appear, disappear } from "./functions.js";

const mainText = document.querySelector('p');

const stages = [
    "Hello",
    "I want ot tell you a story...",
    "Once upon a time there was a Master",
    "He decided to start a new project",
    "This project would be unlike any of His past projects",
    "And He started making it",
    "A day passed",
    "Two days passed",
    "A week passed",
    "Then His friend asked him",
    '"What are you working on?"',
    "The Master answered",
    '"On the same project I was working a week ago"',
    "A month later friend asked the Master again",
    '"What are you working on?"',
    "The Master answered",
    '"On the same project I was working a month ago"',
    "Many years passed",
    "And the Master was still working on the same project",
    "He put all His potential,",
    "all His skills,",
    "all His knowledge,",
    "all His best techniques,",
    "He put all of who He is,",
    "all of His spirit,",
    "all of His essence,",
    "and all the best He had",
    "He put into this project",
    "And after all the hours,",
    "all the days,",
    "all the nights,",
    "and all the years He put into this project",
    "He finally finished it",
    "This project was unlike any of his past projects",
    "It shone like a bright light that gave life to everything around it",
    "He put His work in the gallery",
    "Where were all His other works",
    "Many years passed",
    "This painting has been in many places in this gallery",
    "This painting has changed and grown a lot",
    "It has met many other paintings",
    "And with every action it took and every word it said...",
    "It changed someone's life and made it better",
    "Thank you for being this painting",
    "God is with you."
];

async function processStages() {
    for (const [index, stage] of stages.entries()) {
        await appear(stage, mainText);
        
        if (index+1 === stages.length) { break };

        await waitForNextStage();
        
        await disappear(mainText);
    };
    const clouds = document.querySelectorAll(".cloud");
    clouds.forEach(cloud => {
        cloud.style.opacity = 1;
        cloud.style.filter = "none";
    });
};

let nextStage = false;
document.addEventListener("pointerup", ev => { 
    ev.preventDefault()
    nextStage = true
});

function waitForNextStage() {
    nextStage = false
    return new Promise(resolve => {
        const checkNextStage = () => {
            if (nextStage) {
                nextStage = false;
                resolve();
            } else {
                requestAnimationFrame(checkNextStage);
            };
        };
        checkNextStage();
    });
};

processStages();