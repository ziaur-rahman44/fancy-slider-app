const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// fourth issue solved enter key use show image
searchInput.addEventListener("keypress", function(event){
  if(event.key == "Enter"){
    searchBtn.click();
  }
});



const getImages = (query) => {
  spinnerLoading()
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    // first issue solve hits api property before spelling wrong hitS
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);
    
  })

}

// fifth issue solved can do deselect img else statement
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
  
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } 
  else {
    sliders.splice(item,1);
  }
}
var timer
const createSlider = () => {
  // second issue solved after wrong spelling duration id name 
  const duration = document.getElementById('duration').value || 1000;
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // third issue solved 
  else if(duration < 0){
    alert('duration negative value is not acceptable')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  
  
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

// alert signal for empty value search
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  if(searchInput.value == ""){
    alert('Please type any value.Empty value search item is not available')
  }
  else if(search.value != ""){
    getImages(search.value);
    spinnerLoading()
  }
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
    createSlider();
})

// spinner use
const spinnerLoading = () => {
  const loading = document.getElementById("spinner-loading");
  loading.classList.toggle("d-none");
}

