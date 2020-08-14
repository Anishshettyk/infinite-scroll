const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imageLoad = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;



//unsplash api  
let count = 5;
const apikey = "4IDXCeUB4s3Yo3HAeUxf4sIMHNPa1sg5OckVYxjZvaA";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;


//image imageLoaded(check wheater the image is loaded)

function imageLoaded() {
    imageLoad++;
    if (imageLoad === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
    }
}




//helper function for set attribute 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}



//create elements for links and photos add to the dom
function displayPhotos() {
    imageLoad = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', "_blank");
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        //create an image
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        img.addEventListener('load', imageLoaded)

        //put img inside a .and a inside image conatiner
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


//get photos from unsplash api.
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (err) {
        console.log(`something went wrong:: u got an error like:::${err}`)
    }
}

//check wheater we have reached the bottom of the page to load more photos.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


//on load
getPhotos();