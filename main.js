const quotesContainer = document.querySelector('.quotes-container');
const imagesContainer = document.querySelector('.images-container');

let quotesData = [];
let selectedQuote = null;
let selectedImage = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderContent() {
    quotesContainer.innerHTML = '<h2>Frases Recientes</h2>';
    imagesContainer.innerHTML = '<h2>Imágenes de Personajes</h2>';

    clearSelection();

    const shuffledQuotes = shuffleArray([...quotesData]);
    const shuffledImages = shuffleArray([...quotesData]);

    shuffledQuotes.forEach((item) => {
        const quoteDiv = document.createElement('div');
        quoteDiv.classList.add('quote-item');
        quoteDiv.textContent = `"${item.quote}" - ${item.character}`;
        quoteDiv.dataset.character = item.character; 
        quoteDiv.addEventListener('click', handleQuoteClick);
        quotesContainer.appendChild(quoteDiv);
    });

    shuffledImages.forEach((item) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-item');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.character;
        imageDiv.appendChild(img);
        imageDiv.dataset.character = item.character; 
        imageDiv.addEventListener('click', handleImageClick);
        imagesContainer.appendChild(imageDiv);
    });
}

function handleQuoteClick(event) {
    const clickedQuote = event.currentTarget;

    if (selectedQuote === clickedQuote) {
        selectedQuote.classList.remove('selected');
        selectedQuote = null;
        return;
    }
    
    if (selectedQuote) {
        selectedQuote.classList.remove('selected');
    }
    selectedQuote = clickedQuote;
    selectedQuote.classList.add('selected');
    
    checkMatch();
}

function handleImageClick(event) {
    const clickedImage = event.currentTarget;

    if (selectedImage === clickedImage) {
        selectedImage.classList.remove('selected');
        selectedImage = null;
        return;
    }

    if (selectedImage) {
        selectedImage.classList.remove('selected');
    }
    selectedImage = clickedImage;
    selectedImage.classList.add('selected');

    checkMatch();
}

function clearSelection() {
    if (selectedQuote) {
        selectedQuote.classList.remove('selected');
        selectedQuote = null;
    }
    if (selectedImage) {
        selectedImage.classList.remove('selected');
        selectedImage = null;
    }
}

function checkMatch() {
    if (selectedQuote && selectedImage) {
        const quoteCharacter = selectedQuote.dataset.character;
        const imageCharacter = selectedImage.dataset.character;

        if (quoteCharacter === imageCharacter) {
            selectedQuote.classList.add('matched');
            selectedImage.classList.add('matched');
            
            selectedQuote.removeEventListener('click', handleQuoteClick);
            selectedImage.removeEventListener('click', handleImageClick);

            selectedQuote.classList.remove('selected'); 
            selectedImage.classList.remove('selected'); 
            selectedQuote = null;
            selectedImage = null;
            
        } else {
            setTimeout(() => {
                selectedQuote.classList.remove('selected');
                selectedImage.classList.remove('selected');
                selectedQuote = null;
                selectedImage = null;
            }, 500);
        }
    }
}

function fetchQuotes() {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=5')
        .then(res => res.json())
        .then(data => {
            quotesData = data;
            renderContent();
        })
        .catch(() => {
            quotesContainer.innerHTML = '<p class="error-message">No se pudieron cargar las frases.</p>';
            imagesContainer.innerHTML = '<p class="error-message">No se pudieron cargar las imágenes.</p>';
        });
}
fetchQuotes();