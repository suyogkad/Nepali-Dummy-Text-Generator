import { sentences } from './sentences.js';

// This function returns a random sentence from the array
function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

// This function generates a single paragraph
function generateParagraph(sentenceCount) {
    let paragraph = '';
    for(let i = 0; i < sentenceCount; i++) {
        paragraph += getRandomSentence() + ' ';
    }
    return paragraph.trim() + '.\n\n'; // Add period at the end of paragraph and newline for formatting
}

// This function generates multiple paragraphs
function generateText(paragraphCount, sentenceCount) {
    let text = '';
    for(let i = 0; i < paragraphCount; i++) {
        text += generateParagraph(sentenceCount);
    }
    return text;
}

// Adding event listener to button for generating text
document.getElementById('generateButton').addEventListener('click', function() {
    const textArea = document.getElementById('generatedText');
    const paragraphCount = document.getElementById('paraCount').value;
    const sentenceCount = document.getElementById('sentenceCount').value;
    textArea.value = generateText(paragraphCount, sentenceCount); 
});

// Adding event listener to button for copying text to clipboard
document.getElementById('copyButton').addEventListener('click', function() {
    const textArea = document.getElementById('generatedText');
    textArea.select();
    document.execCommand('copy');
});
