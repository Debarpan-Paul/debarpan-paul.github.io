document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Highlighted Credit Message (Updated with GitHub Link)
    // ===================================
    console.log(
        // Updated the link within the message text
        "%cThis website is designed by Shitij Halder (GitHub: https://github.com/SHITIJHALDER), any modifications in the existing code is strictly not allowed. All the code authority is hereby limited to the author and the designer of the website only. Failing to follow these may result in legal charges.",
        // Styling remains the same
        "color: black; background-color: yellow; padding: 5px 10px; border: 1px solid black; font-weight: bold; display: block; text-align: center;"
    );
    // ===================================

    // ===================================
    // Custom Cursor Logic (Unchanged)
    // ===================================
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor) {
        document.addEventListener('mousemove', function(e) {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });
        const interactiveElements = document.querySelectorAll('a, button, .book-card, .modal-close-btn, .buy-button');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
            element.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
        });
    } else {
        console.warn('Custom cursor element #custom-cursor not found!');
    }

    // ===================================
    // Modal Window Logic (Corrected Attribute Reading)
    // ===================================
    console.log("Modal JS: DOM Loaded. Setting up modal."); // DEBUG

    const modalOverlay = document.getElementById('bookModal');
    if (!modalOverlay) {
        console.warn("Modal JS: Modal overlay element (#bookModal) not found. Modal functionality disabled.");
        return;
    }
    const modalContent = modalOverlay.querySelector('.modal-content');
    const closeBtn = modalOverlay.querySelector('.modal-close-btn');
    const modalBookImage = document.getElementById('modalBookImage');
    const modalBookName = document.getElementById('modalBookName');
    const modalBookDescription = document.getElementById('modalBookDescription');
    const modalBuyLinksContainer = document.getElementById('modalBuyLinks');

    if (!modalContent || !closeBtn || !modalBookImage || !modalBookName || !modalBookDescription || !modalBuyLinksContainer) {
        console.error("Modal JS: One or more essential modal content elements are missing. Cannot proceed.");
        return;
    } else {
        console.log("Modal JS: All modal elements found."); // DEBUG
    }

    const bookTriggers = document.querySelectorAll('.book-card');
    console.log(`Modal JS: Found ${bookTriggers.length} book triggers (.book-card).`); // DEBUG

    function openModal(event) {
        const card = this;
        console.log("Modal JS: Card clicked:", card); // DEBUG

        // --- Get Book Data ---
        const imgSrc = card.querySelector('.book-image')?.src || '';
        const name = card.querySelector('.book-name')?.textContent || 'Book Title';
        const fullDescription = card.dataset.fullDesc || card.querySelector('.book-description')?.textContent || 'No description available.';

        modalBookImage.src = imgSrc;
        modalBookImage.alt = name + " Cover";
        modalBookName.textContent = name;
        modalBookDescription.textContent = fullDescription;

        modalBuyLinksContainer.innerHTML = '<h4>Get Your Copy:</h4>';
        let linksFound = false;

        console.log("Modal JS: Checking for buy links using getAttribute()..."); // DEBUG
        for (let i = 1; i <= 5; i++) {
             const linkUrl = card.getAttribute('data-buy-link-' + i);
             const linkText = card.getAttribute('data-buy-link-' + i + '-text');

             console.log(`Modal JS: Checking link ${i}: URL = ${linkUrl}, Text = ${linkText}`); // DEBUG

             if (linkUrl && linkText) {
                 console.log(`Modal JS: --> Found Link ${i}, creating button.`); // DEBUG
                 const linkElement = document.createElement('a');
                 linkElement.href = linkUrl;
                 linkElement.textContent = linkText;
                 linkElement.target = '_blank';
                 linkElement.rel = 'noopener noreferrer';
                 linkElement.classList.add('buy-button');
                 modalBuyLinksContainer.appendChild(linkElement);
                 linksFound = true;
             }
        }

        if (!linksFound) {
             console.log("Modal JS: No valid buy links found in attributes. Displaying 'Not Available'."); // DEBUG
             modalBuyLinksContainer.innerHTML += '<p>Purchase information not available.</p>';
        }

        console.log("Modal JS: Showing modal."); // DEBUG
        modalOverlay.classList.add('modal-visible');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        console.log("Modal JS: Closing modal."); // DEBUG
        modalOverlay.classList.remove('modal-visible');
         document.body.style.overflow = '';
    }

    if (bookTriggers.length > 0) {
        bookTriggers.forEach(trigger => {
            trigger.addEventListener('click', openModal);
        });
        console.log("Modal JS: Click listeners added to book cards."); // DEBUG
    } else {
        console.warn("Modal JS: No book triggers (.book-card) found to attach listeners to.");
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        console.log("Modal JS: Close button listener added."); // DEBUG
    }

    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    console.log("Modal JS: Overlay click listener added."); // DEBUG

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('modal-visible')) {
            closeModal();
        }
    });
    console.log("Modal JS: Escape key listener added."); // DEBUG
    console.log("Modal JS: Setup complete."); // DEBUG

}); // End DOMContentLoaded