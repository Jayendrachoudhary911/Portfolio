const scriptURL = 'https://script.google.com/macros/s/AKfycbwOsZNxCbeLsuRf4lhQWsQv7Pl2qwIrhaJWROgFCb13MdKYCm454-W-W5o32cIAbwQVqA/exec'; // Replace with your Google Apps Script URL

function calculatePrice() {
    let price = 0;
    const features = document.querySelectorAll('input[type="checkbox"]:checked');
    features.forEach(feature => {
        price += parseInt(feature.value.match(/\d+/)[0]);
    });
    const pages = document.getElementById('pages').value;
    price += parseInt(pages) * 50; // Example cost per page
    document.getElementById('price').innerText = `₹${price}`;
}

async function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('websiteForm');
    const formData = new FormData(form);
    let totalPrice = 0;
    let featuresList = [];

    document.querySelectorAll('input[type="checkbox"]:checked').forEach(feature => {
        featuresList.push(feature.value);
        totalPrice += parseInt(feature.value.match(/\d+/)[0]);
    });

    formData.append('totalPrice', totalPrice);
    formData.append('features', featuresList.join(', '));

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        const result = await response.json();
        if (result.result === 'success') {
            document.getElementById('websiteForm').reset();
            showPopup();
        }
    } catch (error) {
        console.error('Error!', error.message);
    }
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    popup.addEventListener('click', () => {
        popup.style.display = 'none';
        window.location.href = '../index.html'; // Change to your home page URL
    });
}
