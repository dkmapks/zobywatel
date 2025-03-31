const params = new URLSearchParams(window.location.search);

function sendToUrl(url) {
    location.href = `/${url}?` + params;
}

document.querySelectorAll(".bottom_element_grid").forEach((element) => {
    element.addEventListener('click', () => {
        const sendAttribute = element.getAttribute("send");
        if (sendAttribute) {
            sendToUrl(sendAttribute);
        } else {
            console.error("Element missing 'send' attribute");
        }
    });
});

/**
 * Determines the mobile operating system.
 * @returns {number} OS identifier (1: Windows Phone, 2: Android, 3: iOS, 4: Other)
 */
function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return 1;
    }

    if (/android/i.test(userAgent)) {
        return 2;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3;
    }

    return 4;
}

if (getMobileOperatingSystem() === 2) {
    const bottomBar = document.querySelector(".bottom_bar");
    if (bottomBar) {
        bottomBar.style.height = "70px";
    } else {
        console.error("Element '.bottom_bar' not found");
    }
}
