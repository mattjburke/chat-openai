//function countLetters() {
//    var input = document.getElementById('sentenceInput').value;
//    var letterCount = input.replace(/[^a-zA-Z]/g, "").length; // Removes non-letters and counts
//    document.getElementById('letterCount').innerText = letterCount;
//}

document.getElementById('letterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way
    countLetters();
});

function countLetters() {
    var input = document.getElementById('sentenceInput').value;
    var letterCount = input.replace(/[^a-zA-Z]/g, "").length;
    document.getElementById('letterCount').innerText = letterCount;
}
