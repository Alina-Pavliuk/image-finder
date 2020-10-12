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
  apiService.fetchImages().then(({hits}) => renderImages(hits));
  setTimeout(() => {

    window.scrollTo({
      top: document.documentElement.offsetHeight - 1500,
      behavior: 'smooth'
    });
  }, 500)
};

refs.galleryList.addEventListener('click', (e) => {
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

refs.input.addEventListener('input', 
  debounce(event => {
  event.preventDefault();
  refs.galleryList.innerHtml = '';
  apiService.query = event.target.value;
  renderApi();
  refs.input.value = '';
  }, 500),
  
)

loadMoreBtn.addEventListener('click', loadMore);

function renderApi() {
  apiService.fetchImages().then(({hits}) => renderImages(hits))
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
