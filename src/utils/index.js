const highlightText = (text, keywords) => {
    return text.split(/(\s+)/).map((word) => {
        if (keywords.includes(word)) {
            return `<span>${word}</span>`
        }

        return word
    }).join(' ');
}


const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @desc: returns random number from range
 * @param min
 * @param max
 * @returns {number}
 */
const createRandomNum = (min = 0, max = 500) => {

    if (typeof min !== 'number' || typeof max !== 'number' ) {
        console.error('min or max must be numbers');
        return Math.random();
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {highlightText, getRandomInt, createRandomNum}
