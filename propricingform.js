const countryCodes = {
    "India": "+91",
    "United States": "+1",
    "Canada": "+1",
    "United Kingdom": "+44",
    "Australia": "+61"
    // Add more countries and their codes here
};

const countrySelect = document.getElementById("country");
for (const [country, code] of Object.entries(countryCodes)) {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
}

document.getElementById("open-popu").addEventListener("click", function() {
    document.getElementById("popu-bg").style.display = "block";
    document.getElementById("popu-form").style.display = "block";
});

document.getElementById("popu-bg").addEventListener("click", function() {
    document.getElementById("popu-bg").style.display = "none";
    document.getElementById("popu-form").style.display = "none";
});

document.getElementById("pro-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(event.target);
    var email = formData.get("email");
    var phone = formData.get("phone");
    
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number with only digits.");
        return;
    }
    
    var country = formData.get("country");
    var countryCode = countryCodes[country] || "";
    
    var data = {
        name: formData.get("name"),
        email: email,
        phone: countryCode + phone,
        message: formData.get("message"),
        country: country
    };
    
    fetch("https://script.google.com/macros/s/AKfycbzVkiFP5COOpOFJJx_IvlUYxrphj0lxMivwan48JXI1iVOeiCAnNmRY4EhO_T7iTSIIbA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        document.getElementById("success-message").style.display = "block";
        setTimeout(function() {
            document.getElementById("popu-bg").style.display = "none";
            document.getElementById("popu-form").style.display = "none";
            document.getElementById("success-message").style.display = "none";
            document.getElementById("pro-form").reset();
        }, 3000);
    }).catch(error => {
        console.error("Error submitting form:", error);
        alert("Failed to submit the form. Please try again.");
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\d+$/;
    return re.test(String(phone));
}