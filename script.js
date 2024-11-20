import muridData from "./muridData.json" with { type:"json" }
import guruData from "./guruData.json" with { type:"json" }

const guruElem = document.getElementsByClassName("container")[0]
let cardPerSlide

const totalMurid = muridData.murid.length

let displayWidth = window.innerWidth
let cardPerPage = 6
if (displayWidth >= 1440) {
    cardPerSlide = 2
    totalSlide = totalGuru/cardPerSlide
} else if (displayWidth < 1440 && displayWidth >= 1024) {
    cardPerPage = 6
    cardPerSlide = 2
} else if (displayWidth < 1024 && displayWidth >= 463) {
    cardPerPage = 4
    cardPerSlide = 2
} else if (displayWidth < 463) {
    cardPerPage = 2
    cardPerSlide = 1
}

const totalGuru = guruData.guru.length 
let totalSlide = totalGuru/cardPerSlide

for (let i = 0; i < totalGuru; i += cardPerSlide) {
    const createBox = document.createElement("div");
    createBox.setAttribute("class", "box");
    
    for (let j = 0; j < cardPerSlide && i + j < totalGuru; j++) {
        const createTeachers = document.createElement("div");
        const createTitle = document.createElement("h1");
        const createImg = document.createElement("img");
        const createGuru = document.createElement("h2");

        createTeachers.setAttribute("class", "teachers");
        createTitle.innerHTML = guruData.guru[i + j].judul;
        createImg.setAttribute("src", "image/teachers/"+guruData.guru[i+j].foto+".jpeg")
        createImg.onerror = function() {
            this.src = "image/teachers/profile.png";
        };
        createGuru.innerHTML = guruData.guru[i + j].guru;

        createTeachers.appendChild(createTitle);
        createTeachers.appendChild(createImg);
        createTeachers.appendChild(createGuru);
        
        createBox.appendChild(createTeachers);
    }

    guruElem.appendChild(createBox);
}

const guruCards = document.getElementsByClassName("box") 

let currentSlide = 1

export function prevSlide() {
    currentSlide -= 1
    if (currentSlide <= 0) {
        currentSlide = totalSlide
    }
    showSlide(currentSlide)
}

export function nextSlide() {
    currentSlide += 1
    if (currentSlide > totalSlide) {
        currentSlide = 1
    }
    showSlide(currentSlide)
}

function showSlide(slide) {
    for (let i = 0; i < totalSlide; i++) {
        guruCards[i].style.display = "none";
    }

    guruCards[slide - 1].style.display = "flex";
    console.log(currentSlide)
}

const title = document.getElementById("title")
if (displayWidth > 463) {
    title.innerHTML = "XEDUNIK"
} else {
    title.innerHTML = "XI-2"
}

const maxPerPage = Math.ceil(totalMurid/cardPerPage)

const muridElem = document.getElementsByClassName("murid-container")[0]
for (let i = 0; i < muridData.murid.length; i++) {
    
    const createCards = document.createElement("div")
    const createProfile = document.createElement("img")
    const createName = document.createElement("h1")

    createProfile.setAttribute("src", "image/photos/"+(i+1)+".JPG")
    createProfile.onerror = function() {
        this.src = "image/photos/photo.jpeg";
    };

    createCards.setAttribute("class", "murid-cards")
    
    createName.innerText = (i+1) + ". " +muridData.murid[i].nama
    
    createCards.appendChild(createProfile)
    createCards.appendChild(createName)
    muridElem.appendChild(createCards)
}

const muridCards = document.getElementsByClassName("murid-cards")

let currentPage = 1

export function prevMurid() {
    currentPage -= 1
    if (currentPage <= 0) {
        currentPage = maxPerPage
    }
    showPage(currentPage)
}
export function nextMurid() {
    currentPage += 1
    if (currentPage > maxPerPage) {
        currentPage = 1
    }
    showPage(currentPage)
}
function showPage(page) {
    for (let i = 0; i < muridCards.length; i++) {
        muridCards[i].style.display = "none"
    }
    let startIndex = (page-1)*cardPerPage
    let endIndex = startIndex + cardPerPage

    requestAnimationFrame(() => {
        for (let i = startIndex; i < endIndex; i++) {
            muridCards[i].style.display = "block";
        }
    });
}
document.addEventListener("DOMContentLoaded", function() {
    showPage(1);
    showSlide(1)
});

const imageContainer = document.getElementById("gallery")
export function galleryImage(imgCount) {
    imgCount
    for (let i = 1; i <= imgCount; i++) {
        const createImage = document.createElement("img")
        createImage.setAttribute("src", "image/documentations/"+i+".jpg")

        imageContainer.appendChild(createImage)
    }
}
galleryImage(4)

window.prevSlide = prevSlide
window.nextSlide = nextSlide
window.prevMurid = prevMurid
window.nextMurid = nextMurid
window.showPage = showPage
