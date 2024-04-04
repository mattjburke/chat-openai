function countLetters() {
    var input = document.getElementById('sentenceInput').value;
    var letterCount = input.replace(/[^a-zA-Z]/g, "").length; // Removes non-letters and counts
    document.getElementById('letterCount').innerText = letterCount;
}
