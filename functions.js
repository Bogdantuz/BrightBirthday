export async function appear(text, element) {
    let delay = 0.9;
    const words = text.split(' ').map(word => {
        return word.split('').map(char => {
            const newEl = document.createElement('a');
            newEl.textContent = char;
            newEl.style.transition = `filter cubic-bezier(0.9,0.0005,0.01,0.04) ${delay}s, 
                text-shadow ${delay}s, bottom ${delay}s, right ${delay}s`;
            delay += 0.05;
            newEl.classList.add("before-appear");
            return newEl;
        });
    });

    element.innerHTML = '';
    words.forEach(wordChars => {
        const wordContainer = document.createElement('a');
        wordChars.forEach(charEl => wordContainer.appendChild(charEl));
        element.appendChild(wordContainer);
        element.appendChild(document.createTextNode(' '));
    });

    requestAnimationFrame(() => {
        element.childNodes.forEach((word) => {
            if (word.nodeType === Node.ELEMENT_NODE) {
                word.childNodes.forEach((char) => {
                    char.getBoundingClientRect();
                    char.classList.add("appeared")
                });
            }
        });
    });

    return new Promise(resolve => {
        setTimeout(resolve, 1800);
    });
};

export async function disappear(element) {
    let delay = 0.9;
    element.childNodes.forEach((word) => {
        if (word.nodeType === Node.ELEMENT_NODE) {
            word.childNodes.forEach((char) => {
                char.style.transition = `filter cubic-bezier(0.76, 0, 0.6, 0.99) ${delay}s,
                    text-shadow cubic-bezier(0.82, 0.01, 0.83, 0.43) ${delay}s,
                    bottom cubic-bezier(0.82, 0.01, 0.83, 0.43) ${delay}s,
                    right cubic-bezier(0.82, 0.01, 0.83, 0.43) ${delay}s,
                    opacity cubic-bezier(0.82, 0.01, 0.91, 0.4) ${delay}s`;
                delay += 0.02;
                char.classList.add("disappearing")
            });
        };
    });

    return new Promise(resolve => {
        setTimeout(resolve, 1800);
    });
};