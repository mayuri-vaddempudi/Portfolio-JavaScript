
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("JNEnboO2ggw8dpHDZ"); // Public Key

    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous message
        formMessage.textContent = "";
        formMessage.className = "";
        formMessage.style.opacity = "0";

        // Disable button while sending
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_lylxh9j', 'template_tc7efmf', templateParams)
            .then(function (response) {
                console.log("EmailJS Success:", response);
                formMessage.textContent = "✅ Message sent successfully! Thank you.";
                formMessage.classList.add('success', 'show');
                formMessage.style.opacity = "1";
                form.reset();
            })
            .catch(function (error) {
                console.error("EmailJS Error:", error);
                formMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
                formMessage.classList.add('error', 'show');
                formMessage.style.opacity = "1";
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            });
    });
});