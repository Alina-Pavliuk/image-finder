import refs from './refs.js';
import template from "../template/template.hbs";
import apiService from "./apiService.js";
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox'
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css"
import '@babel/polyfill'



console.log(refs);
const loadMoreBtn = document.createElement('button');

function loadMore() {
  apiService.setPage();
  apiService.fetchImages().then((data) => renderImages(data));
  setTimeout(() => {

    window.scrollTo({
      top: document.documentElement.offsetHeight - 1500,
      behavior: 'smooth'
    });
  }, 500)
};

refs.galleryList.addEventListener('click', (e) => {
  // console.dir(e.target.dataset);
  let modeRsc;
  
  if(e.target.nodeName  === 'IMG') {
  modeRsc = e.target.dataset.src;
  const instance = basicLightbox.create(`
    <div class="modal">
    <button class="js-mod-btn" type="button">X</button>
       <img src="${modeRsc}" alt="picture" class="js-mod-img">
    </div>
  `)
  instance.show()
  }
})

refs.form.addEventListener('input', 
  debounce(event => {
  event.preventDefault();
  refs.galleryList.innerHTML = '';
  apiService.query = event.target.value;
  renderApi();
  refs.input.value = '';

  }, 1000),
  
)

loadMoreBtn.addEventListener('click', loadMore);

function renderApi() {
  apiService.fetchImages().then((data) => {
    renderImages(data)})
};

function renderImages (data) {
  const items = template(data);
  refs.galleryList.insertAdjacentHTML('beforeend', items);
    
  loadMoreBtn.textContent = 'Load more...';
  loadMoreBtn.classList.add('loadMore-button');

  if(refs.galleryList.children) {
    refs.body.insertAdjacentElement('beforeend', loadMoreBtn);
    loadMoreBtn.classList.remove('hidden');

  } else {
    loadMoreBtn.classList.add('hidden');
  }
}
