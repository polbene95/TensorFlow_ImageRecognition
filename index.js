let net;
const imgURL = "https://images.pexels.com/photos/605496/pexels-photo-605496.jpeg"

const resultsList = document.getElementById("result-container");
const loaderConteiner = document.getElementById("loader");
const imageElement = document.getElementById("img");
const inputField = document.getElementById("input");

const runModelButton = document.getElementById("run-model-button");
const resetButton = document.getElementById("reset-button");
const uploadButton = document.getElementById("upload-button");


runModelButton.addEventListener("click", app);
resetButton.addEventListener("click", resetImage);
uploadButton.addEventListener("click", setNewImage);



async function app() {
    createList([], resultsList)
    toggleLoader(loaderConteiner)

    net = await mobilenet.load();

    const imgEl = document.getElementById('img');
    const result = await net.classify(imgEl);

    createList(result, resultsList)
    toggleLoader(loaderConteiner)
}

function toggleLoader(loaderDiv) {

    if (loaderDiv.classList.contains("loading")) {
        loaderDiv.classList.remove("loading")
    } else {
        loaderDiv.classList.add("loading")
    }
}

function createList(array, container) {
    let content = ""
    array.forEach((element, index) => {
        let className = "result"
        console.log(index)
        if (index == 0) {
            className = className + " first"
        }
        console.log(className)
        content += `
            <li class="${className}">
                <p>Guess: ${element.className}</p>
                <p>Probability: ${(parseFloat(element.probability)*100).toFixed("2")} %</p>
            </li>`
    })
    container.innerHTML = content;
}

function resetImage() {
    setImageSource(imgURL)
}

function setImageSource(imageURL) {
    imageElement.src = imageURL;
}

function setNewImage() {
    const value = inputField.value;
    if (value) {
        setImageSource(value)
    }
}
