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

const proPlanschInfo = "School Pro Plan";
const basicPlanschInfo = "School Basic Plan";
const proPlanInfo = "Business Pro Plan";
const basicPlanInfo = "Business Basic Plan";

function showPopup(planInfo) {
    document.getElementById("plan-info").textContent = planInfo;
    document.getElementById("popup-bg").style.display = "block";
    document.getElementById("popup-form").style.display = "block";
}

document.getElementById("pro-plan-sch-btn").addEventListener("click", function() {
    showPopup(proPlanschInfo);
    document.getElementById("message").value = "School Pro Plan with Pricing as ₹36,000/-";
});
document.getElementById("basic-plan-sch-btn").addEventListener("click", function() {
    showPopup(basicPlanschInfo);
    document.getElementById("message").value = "School Basic Plan with Pricing as ₹25,000/-";
});
document.getElementById("pro-plan-btn").addEventListener("click", function() {
    showPopup(proPlanInfo);
    document.getElementById("message").value = "Business Pro Plan with Pricing as ₹43,500/-";
});
document.getElementById("basic-plan-btn").addEventListener("click", function() {
    showPopup(basicPlanInfo);
    document.getElementById("message").value = "Business Basic Plan with Pricing as ₹34,400/-";
});

document.getElementById("popup-bg").addEventListener("click", function() {
    document.getElementById("popup-bg").style.display = "none";
    document.getElementById("popup-form").style.display = "none";
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
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
    
    fetch("https://script.google.com/macros/s/AKfycby5pqaDaO8NPuH28VINAyAfUjLYb4Uir0gR-JTKg3yFuuzOUfOGw4yX_GI_if5wPCHYcA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        document.getElementById("success-message").style.display = "block";
        setTimeout(function() {
            document.getElementById("popup-bg").style.display = "none";
            document.getElementById("popup-form").style.display = "none";
            document.getElementById("success-message").style.display = "none";
            document.getElementById("contact-form").reset();
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