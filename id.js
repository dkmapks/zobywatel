// Get URL parameters
const params = new URLSearchParams(window.location.search);

// Add event listener to login button
document.querySelector(".login").addEventListener('click', toHome);

// Set welcome message based on time of day
let welcome = "Dzień dobry!";
const date = new Date();
if (date.getHours() >= 18) {
    welcome = "Dobry wieczór!";
}
document.querySelector(".welcome").innerHTML = welcome;

// Redirect to home with URL parameters
function toHome() {
    location.href = `/home?${params}`;
}

// Handle password input
const input = document.querySelector(".password_input");
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
    }
});

const dot = "•";
let original = "";
const eye = document.querySelector(".eye");

input.addEventListener("input", () => {
    const value = input.value.toString();
    const char = value.substring(value.length - 1);
    if (value.length < original.length) {
        original = original.substring(0, original.length - 1);
    } else {
        original += char;
    }

    if (!eye.classList.contains("eye_close")) {
        const dots = Array(value.length - 1).fill(dot).join('');
        input.value = dots + char;
        delay(3000).then(() => {
            const currentValue = input.value;
            if (currentValue.length !== 0) {
                input.value = currentValue.substring(0, currentValue.length - 1) + dot;
            }
        });
    }
});

// Delay function
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Toggle eye icon to show/hide password
eye.addEventListener('click', () => {
    const classlist = eye.classList;
    if (classlist.contains("eye_close")) {
        classlist.remove("eye_close");
        const dots = Array(input.value.length - 1).fill(dot).join('');
        input.value = dots;
    } else {
        classlist.add("eye_close");
        input.value = original;
    }
});
