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
    const generatedText = generateText(paragraphCount, sentenceCount); 
    textArea.value = generatedText;
    
    // Save generated text to local storage
    localStorage.setItem('generatedText', generatedText);
});

// Load saved generated text from local storage
window.onload = function() {
    const savedText = localStorage.getItem('generatedText');
    if (savedText) {
        const textArea = document.getElementById('generatedText');
        textArea.value = savedText;
    }
}


// Adding event listener to button for copying text to clipboard
document.getElementById('copyButton').addEventListener('click', function() {
    const textArea = document.getElementById('generatedText');
    const copyMessage = document.getElementById('copyMessage');

    // Check if textArea is empty
    if (textArea.value.trim() === '') {
        copyMessage.textContent = 'Why copy blank space ?';
        copyMessage.style.opacity = '1';  // Reset opacity

        setTimeout(function() {
            copyMessage.style.opacity = '0';  // Make message fade away
        }, 2000);  // 2000ms = 2s
        return;
        
    }

    navigator.clipboard.writeText(textArea.value).then(function() {
        copyMessage.textContent = 'Text copied to clipboard.';
        copyMessage.style.opacity = '1';  // Reset opacity

        setTimeout(function() {
            copyMessage.style.opacity = '0';  // Make message fade away
        }, 2000);  // 2000ms = 2s
    }, function(err) {
        copyMessage.textContent = 'Failed to copy text.';
        console.error('Could not copy text: ', err);
    });
});


// Adding event listener to clear button
document.getElementById('clearButton').addEventListener('click', function() {
    const textArea = document.getElementById('generatedText');
    textArea.value = '';
    
    // Update local storage
    localStorage.setItem('generatedText', '');
});
