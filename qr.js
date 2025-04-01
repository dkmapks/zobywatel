// Select the error element
const error = document.querySelector(".error");

if (error) {
    // Add event listeners to elements with the class 'action'
    document.querySelectorAll(".action").forEach((element) => {
        element.addEventListener('click', () => {
            error.classList.add("error_open");
        });
    });

    // Add event listeners to elements with the class 'close'
    document.querySelectorAll(".close").forEach((element) => {
        element.addEventListener('click', () => {
            error.classList.remove("error_open");
        });
    });
} else {
    console.error("Element with class 'error' not found.");
}
