const selector = document.querySelector(".selector_box");
selector.addEventListener('click', toggleSelector);

document.querySelectorAll(".date_input").forEach(element => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

let sex = "m";

document.querySelectorAll(".selector_option").forEach(option => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    });
});

const upload = document.querySelector(".upload");
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach(element => {
    const input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    });
});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', handleImageUpload);

document.querySelector(".go").addEventListener('click', processForm);

const guide = document.querySelector(".guide_holder");
guide.addEventListener('click', toggleGuide);

function toggleSelector() {
    selector.classList.toggle("selector_open");
}

function handleImageUpload() {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    const file = imageInput.files[0];
    const data = new FormData();
    data.append("image", file);

    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            'Authorization': 'Client-ID d9ec8a5a866a2f7'
        },
        body: data
    })
    .then(response => response.json())
    .then(response => {
        const url = response.data.link;
        upload.classList.remove("error_shown");
        upload.setAttribute("selected", url);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        upload.querySelector(".upload_uploaded").src = url;
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        upload.classList.add("error_shown");
        upload.classList.remove("upload_loading");
    });
}

function processForm() {
    const empty = [];
    const params = new URLSearchParams();

    params.set("sex", sex);

    if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown");
    } else {
        params.set("image", upload.getAttribute("selected"));
    }

    let birthday = "";
    let dateEmpty = false;
    document.querySelectorAll(".date_input").forEach(element => {
        birthday += "." + element.value;
        if (isEmpty(element.value)) {
            dateEmpty = true;
        }
    });

    birthday = birthday.substring(1);

    if (dateEmpty) {
        const dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday);
    }

    document.querySelectorAll(".input_holder").forEach(element => {
        const input = element.querySelector(".input");

        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value);
        }
    });

    if (empty.length !== 0) {
        empty[0].scrollIntoView();
    } else {
        forwardToId(params);
    }
}

function isEmpty(value) {
    const pattern = /^\s*$/;
    return pattern.test(value);
}

function forwardToId(params) {
    location.href = "/id?" + params;
}

function toggleGuide() {
    guide.classList.toggle("unfolded");
}
