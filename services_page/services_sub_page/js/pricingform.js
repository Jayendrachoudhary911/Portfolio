document.addEventListener("DOMContentLoaded", function () {
    const countryCodes = {
        "India": "+91",
        "United States": "+1",
        "Canada": "+1",
        "United Kingdom": "+44",
        "Australia": "+61"
        // Add more countries and their codes here
    };

    const countrySelect = document.getElementById("country");
    if (countrySelect) {
        for (const [country, code] of Object.entries(countryCodes)) {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        }
    }

    const uiuxServices = "UI/UX";
    const cmsServices = "CMS - Content Management Services";
    const cdServices = "Custom Domain";
    const webdevServices = "Web Development";
    const webdesignServices = "Web Designing";
    const webhostingServices = "Web Hosting";
    const smsServices = "Site Maintanance";
    const seoServices = "SEO - Search Engine Optimisation";
    const proPlanschInfo = "Pro Plan";
    const basicPlanschInfo = "Basic Plan";
    const proPlanInfo = "Business Pro Plan";
    const basicPlanInfo = "Business Basic Plan";

    function showPopup(planInfo) {
        const planInfoElement = document.getElementById("plan-info");
        const popupBg = document.getElementById("popup-bg");
        const popupForm = document.getElementById("popup-form");

        if (planInfoElement && popupBg && popupForm) {
            planInfoElement.textContent = planInfo;
            popupBg.style.display = "block";
            popupForm.style.display = "block";
        }
    }

    const uxuiServiceBtn = document.getElementById("ui-ux-service-btn");
    if (uxuiServiceBtn) {
        uxuiServiceBtn.addEventListener("click", function () {
            showPopup(uiuxServices);
            const message = document.getElementById("message");
            if (message) message.value = "UI/UX";
        });
    }

    const cmsServiceBtn = document.getElementById("cms-service-btn");
    if (cmsServiceBtn) {
        cmsServiceBtn.addEventListener("click", function () {
            showPopup(cmsServices);
            const message = document.getElementById("message");
            if (message) message.value = "CMS - Content Management Services";
        });
    }

    const cdServiceBtn = document.getElementById("cd-service-btn");
    if (cdServiceBtn) {
        cdServiceBtn.addEventListener("click", function () {
            showPopup(cdServices);
            const message = document.getElementById("message");
            if (message) message.value = "Custom Domains";
        });
    }

    const webdevServiceBtn = document.getElementById("web-dev-service-btn");
    if (webdevServiceBtn) {
        webdevServiceBtn.addEventListener("click", function () {
            showPopup(webdevServices);
            const message = document.getElementById("message");
            if (message) message.value = "Web Development";
        });
    }

    const webhostingServiceBtn = document.getElementById("web-hosting-service-btn");
    if (webhostingServiceBtn) {
        webhostingServiceBtn.addEventListener("click", function () {
            showPopup(webhostingServices);
            const message = document.getElementById("message");
            if (message) message.value = "Web Hosting";
        });
    }

    const smsServiceBtn = document.getElementById("sms-service-btn");
    if (smsServiceBtn) {
        smsServiceBtn.addEventListener("click", function () {
            showPopup(smsServices);
            const message = document.getElementById("message");
            if (message) message.value = "SMS - Site Maintanance Services";
        });
    }

    const seoServiceBtn = document.getElementById("seo-service-btn");
    if (seoServiceBtn) {
        seoServiceBtn.addEventListener("click", function () {
            showPopup(seoServices);
            const message = document.getElementById("message");
            if (message) message.value = "SEO - Search Engine Optimisation";
        });
    }

    const webdesignServiceBtn = document.getElementById("web-design-service-btn");
    if (webdesignServiceBtn) {
        webdesignServiceBtn.addEventListener("click", function () {
            showPopup(webdesignServices);
            const message = document.getElementById("message");
            if (message) message.value = "Web Design";
        });
    }

    const proPlanschInfoBtn = document.getElementById("pro-plan-sch-btn");
    if (proPlanschInfoBtn) {
        proPlanschInfoBtn.addEventListener("click", function () {
            showPopup(proPlanschInfo);
            const message = document.getElementById("message");
            if (message) message.value = "Web Development Basic Plan - ₹36,000/-";
        });
    }
    
    const basicPlanschInfoBtn = document.getElementById("basic-plan-sch-btn");
    if (basicPlanschInfoBtn) {
        basicPlanschInfoBtn.addEventListener("click", function () {
            showPopup(basicPlanschInfo);
            const message = document.getElementById("message");
            if (message) message.value = "Web Development Basic Plan - ₹25,000/-";
        });
    }

    
    const proPlanInfoBtn = document.getElementById("pro-plan-btn");
    if (proPlanInfoBtn) {
        proPlanInfoBtn.addEventListener("click", function () {
            showPopup(proPlanInfo);
            const message = document.getElementById("message");
            if (message) message.value = "Web Development Business Basic Plan - ₹43,500/-";
        });
    }
    
    const basicPlanInfoBtn = document.getElementById("basic-plan-btn");
    if (basicPlanInfoBtn) {
        basicPlanInfoBtn.addEventListener("click", function () {
            showPopup(basicPlanInfo);
            const message = document.getElementById("message");
            if (message) message.value = "Web Development Business Pro Plan - ₹34,400/-";
        });
    }


    const popupBg = document.getElementById("popup-bg");
    if (popupBg) {
        popupBg.addEventListener("click", function () {
            popupBg.style.display = "none";
            const popupForm = document.getElementById("popup-form");
            if (popupForm) popupForm.style.display = "none";
        });
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const email = formData.get("email");
            const phone = formData.get("phone");

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (!validatePhone(phone)) {
                alert("Please enter a valid phone number with only digits.");
                return;
            }

            const country = formData.get("country");
            const countryCode = countryCodes[country] || "";

            const data = {
                name: formData.get("name"),
                email: email,
                phone: countryCode + phone,
                message: formData.get("message"),
                country: country
            };

            fetch("https://script.google.com/macros/s/AKfycbwpn88ZeRSiyIJQWv-3ko4GY-HohHba9K50ed9zzA7MP2EfTwmGZbIbSHraU02zpOBvGA/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => {
                const successMessage = document.getElementById("success-message");
                if (successMessage) {
                    successMessage.style.display = "block";
                    setTimeout(function () {
                        if (popupBg) popupBg.style.display = "none";
                        const popupForm = document.getElementById("popup-form");
                        if (popupForm) popupForm.style.display = "none";
                        successMessage.style.display = "none";
                        contactForm.reset();
                    }, 3000);
                }
            }).catch(error => {
                console.error("Error submitting form:", error);
                alert("Failed to submit the form. Please try again.");
            });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^\d+$/;
        return re.test(String(phone));
    }
});
