const quoteDiv = document.getElementById("qoute-for-day");
const quoteAuthor = document.getElementById("qoute-author");
const quoteContainer = document.getElementById("quote-container");

const fetchQuote = async () => {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayQuoteToHtml(data.data);
    getRandomImage();
  } catch (error) {
    console.error(error);
  }
};

const saveToClipboard = async () => {
  const text = `${quoteDiv.textContent} ${quoteAuthor.textContent}`;
  try {
    await navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
  } catch (error) {
    alert("Failed to copy quote.");
  }
};

const shareOnTwitter = () => {
  const text = encodeURIComponent(
    `${quoteDiv.textContent} ${quoteAuthor.textContent}`
  );
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, "_blank");
};

const displayQuoteToHtml = (data) => {
  quoteDiv.innerText = data.content;
  quoteAuthor.innerText = data.author;
};

const getRandomImage = async () => {
  
};

fetchQuote();