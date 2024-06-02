// lets make these quotes rotate .. 

// constants:
document.addEventListener('DOMContentLoaded', function() {
    const quotes = [
        // funny made up quotes 
        "Without Play2Learn, I would have failed fifth grade algebra!",
        "Play2Learn gave me the potential to understand E=mc^2!",
        "Thank you Play2Learn. I could NOT have made it through the ACT w/o you.",
        "Play2Learn instilled courage and inspiration to paint the Mona Lisa!"
    ];

    // funny  authors ideas
    const authors = [
        "~ Jimmy Nuetron",
        "~ Albert Einstein",
        "~ Paris Hilton",
        "~ Leonardo Da Vinci",
    ];

    // start at 0 rotate after 10s
    let index = 0
    rotateQuote();
    setInterval(rotateQuote, 10000);

    function rotateQuote() {
        const quoteContent = document.getElementById('quote-text');
        const authorId = document.getElementById('quote-author');

        // adding quotations around quotes
        const quotesWithQuotations = '"' + quotes[index] + '"';

        quoteContent.textContent = quotesWithQuotations
        authorId.textContent = authors[index];

        index = (index + 1) % quotes.length;
    }
});