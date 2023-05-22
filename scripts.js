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
    return paragraph.trim() + '\n\n'; // formatting
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
    const copyMessage = document.getElementById('copyMessage');

    navigator.clipboard.writeText(textArea.value).then(function() {
        // Show the message when copying to clipboard was successful
        copyMessage.textContent = 'Text copied to clipboard.';
    }, function(err) {
        // Show an error message when copying to clipboard failed
        copyMessage.textContent = 'Failed to copy text.';
        console.error('Could not copy text: ', err);
    });
});
