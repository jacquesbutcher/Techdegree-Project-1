/******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator
******************************************/

/************************************/
/*** VARIABLE DECLARATION SECTION ***/
/************************************/

// The quotes object aray (also name of the constant) contains all the quotes and their sources.  Some also contain citation and year.
const quotes = [
  {quote: 'To live is the rarest thing in the world. Most people exist, that is all.', source: 'Oscar Wilde'},
  {quote: 'That\'s why they call it the American Dream, because you have to be asleep to believe it.', source: 'George Carlin'},
  {quote: 'Before you judge a man, walk a mile in his shoes. After that who cares?... He’s a mile away and you’ve got his shoes!', source: 'Billy Connolly', tags: 'humor'},
  {quote: 'People say nothing is impossible, but I do nothing every day', source: 'A. A. Milne', tags: 'humor'},
  {quote: 'Light travels faster than sound. This is why some people appear bright until you hear them speak.', source: 'Alan Dundes', tags: 'humor'},
  {quote: 'Men marry women with the hope they will never change. Women marry men with the hope they will change. Invariably they are both disappointed.', source: 'Albert Einstein'},
  {quote: 'Life was like a box of chocolates. You neven know whate you\'re gonna get.', source: 'Tom Hanks', citation: 'Forest Gump', year: '1994', tags: 'Movies'},
  {quote: 'No, I am your father', source: 'Darth Vader', citation: 'Star Wars Episode 5 - The Empire Strikes Back', year: '1980', tags: 'Movies'},
  {quote: 'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.', source: 'Patrick McKenzie'},
  {quote: 'You are not entitled to your opinion. You are entitled to your informed opinion. No one is entitled to be ignorant.', source: 'Harlan Ellison'},
  {quote: 'An intellectual is someone whose mind watches itself.', source: 'Albert Camus'},
  {quote: 'Genius is talent set on fire by courage.', source: 'Henry Van Dyke'},
  {quote: 'I not only use all the brains that I have, but all that I can borrow.', source: 'Woodrow Wilson'},
  {quote: 'Talent hits a target no one else can hit. Genius hits a target no one else can see.', source: 'Arthur Schopenhauer'},
  {quote: 'I know that I am intelligent, because I know that I know nothing.', source: 'Socrates'},
  {quote: 'You\'re gonna need a bigger boat.', source: 'SocMartin Brody', citation: 'Jaws', year: '1975', tags: 'Movies'},
  {quote: 'An escalator can never break: it can only become stairs.', source: 'Mitch Hedberg'},
]

// Create global variables for the 3 buttons used on the main HTML page.
const loadQuoteBtn = document.getElementById('loadQuoteBtn');
const enaAutoRefreshBtn = document.getElementById('enaAutoRefreshBtn');
const disAutoRefreshBtn = document.getElementById('disAutoRefreshBtn');

var autoRefreshVar;  // this global variable is used to set and clear the automatic quote refresh interval.

/************************************/
/*** FUNCTION DECLARATION SECTION ***/
/************************************/

/* 
  The getRandomQuote function;
  1. Generates a random number.
  2. Obtains a quote from the quotes object using the random number generated in step 1 above.
  3. Returns the quote to the printQuote calling function.
*/
function getRandomQuote () {
  const randomNumber = (Math.floor(Math.random() * quotes.length + 1) - 1);  // 1 is substracted because the first element in the quotes object array has a refence of 0
  const randomQuote = quotes[randomNumber];  
  return randomQuote;
}


/*** The RandomRG function generates a random number which will be used by the folowing function to generate a random color ***/
function randomRGB() {
  return Math.floor(Math.random() * 256);
}

/* The randomColor function used the random number generated by the function aboe to generate a random color which will be used to change the body background color */
function randomColor() {
  var color = 'rgb(';
  color += randomRGB() + ',';
  color += randomRGB() + ',';
  color += randomRGB() + ')';
  return color;
}

/*
  The printQuote function;
  1. Is called when the the loadQuoteBtn and enaAutoRefreshBtn buttons are clicked.
  2. Invoke the getRandomQuote function to obtain a new random quote.
  3. Add the quote and source ojbect properties to the HTML output array.
  4. Determine if the quote object contains a citation property and if so adds it to the HTML array.
  5. Determine if the quote object contains a year property and if so adds it to the HTML output array.
  6. Output the HTML array to the quote-box section on the main HTML page.
*/
function printQuote(){
  var rgbColor;
  var myQuote = getRandomQuote();  // obtain the random quote from the quotes array

  // etermine if a previous quote already exist.  If one does and if it's the same as the new one then generate another one.  Keep checking until the new one is unique.
  if(document.getElementById("quote") != null) {
    var previousQuote = document.getElementById("quote").innerText;
    while(myQuote.quote === previousQuote) {
      myQuote = getRandomQuote();
    }
  }
  
  // Add the quote and source paragraphs to the HTML output.
  HTML = `<p class="quote" id="quote">${myQuote.quote}</p>
          <p class="source">${myQuote.source}`;

  // Determine if quote object has a citation property. If it does then add it to the HTML output array.
  if(myQuote.citation) {
    HTML += `<span class="citation">${myQuote.citation}</span>`;
  }

  // Determine if quote object has a citation property. If it does then add it to the HTML output array.
  if(myQuote.year) {
    HTML += `<span class="year">${myQuote.year}</span>`;
  }

  HTML += `</p>`;  // source paragraph closing

  document.body.style.backgroundColor = randomColor();  // change the page background color.
  document.getElementById('quote-box').innerHTML = HTML;  // update the quote-box div on the main HTML page.
}

/* 
  The disableEnableBtns function:  
  1. Is called by both the enaAutoRefresh and disAutoRefresh functions when their respective buttons are clicked.
  2. Disables the first button passed to it.
  3. Changes the appearance of the disabled button so that it appears disabled.
  4. Enables the second button passed to it.
  5. Changes the appearance of the enabled button so that it appears enabled.
*/
function disableEnableBtns(disableBtn, enableBtn) {
  // Disable the first button passed and make it look disabled.
  disableBtn.disabled = true;
  disableBtn.style.boxShadow = '0px 0px 0px 0px';
  disableBtn.style.background = '#adadad';
  disableBtn.style.cursor = 'default';

  // Enable the second button passed and make it look disabled
  enableBtn.disabled = false;
  enableBtn.style.boxShadow = '3px 5px 10px rgba(0,0,0,0.5)';
  enableBtn.style.background = 'webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f5f5f5), color-stop(1, #adadad))';
  enableBtn.style.background = '-moz-linear-gradient(center top, #f5f5f5 5%, #adadad 100%)';
  enableBtn.style.cursor = 'pointer';
}

/* The enaAutoRefresh function:
  1. Is called by the enaAutoRefreshBtn when clicked.
  2. Calls the printQuote function every 5 seconds to generate a new quote and change the page background.
  3. Disables the eneAutoRefreshBtn and enables the disAutoRefreshBtn buttons.
*/
function enaAutoRefresh() {
  autoRefreshVar = setInterval(() => {
    printQuote();
  }, 5000);

  disableEnableBtns(enaAutoRefreshBtn, disAutoRefreshBtn);
}

/* The disAutoRefresh function:
  1. Is called by the disAutoRefreshBtn when clicked.
  2. Clears (cancels) the auto refresh interval which in turn disables the automatic quote generation.
  3. Disables the disAutoRefreshBtn and enables the enaAutoRefreshBtn buttons.
*/
function disAutoRefresh() {
  clearInterval(autoRefreshVar);
  disableEnableBtns(disAutoRefreshBtn, enaAutoRefreshBtn);
}

/********************/
/*** MAIN SECTION ***/
/********************/

/* 
  The statements in this main section:
  1.  Disables the disAutoRefreshBtn during the initial page load.  
  2.  Adds a click event listener to the loadQuoteBtn which will invoke the printQuote function.
  3.  Adds a click event listener to the enaAutoRefreshBtn which will invoke the enaAutoRefresh function.  
      This will start the auto quote refresh every 5 seconds, disbale the enaAutoRefresh and enable the disAutoRefreshBtn buttons respectively.
  2.  Adds a click event listener to the disAutoRefreshBtn which will invoke the disAutoRefresh function.  
      This will stop the auto quote refresh every, disable the disAutoRefresh and enable the enaAutoRefreshBtn buttons respectively.
Clicking the "Show another quote" button on the main index page triggers 
  the even listener below which will in turn invoke the 'printQuote' function.
*/
disableEnableBtns(disAutoRefreshBtn, enaAutoRefreshBtn);  // 
loadQuoteBtn.addEventListener('click', printQuote, false);
enaAutoRefreshBtn.addEventListener('click', enaAutoRefresh, false); 
disAutoRefreshBtn.addEventListener('click', disAutoRefresh, false);
