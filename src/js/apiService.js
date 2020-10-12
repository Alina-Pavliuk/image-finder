import refs from './refs.js'

const baseUrl = `https://pixabay.com/api/`;


export default {
  _query: '', 
  page: 1, 
  perPage: 12,
  
  async fetchImages(){
    const API_key = '18623582-6f69f86bdba13cc9fd0a5c03d';
    const params =`?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${API_key}`;
    const url = baseUrl + params
     
    try{
      const res = await fetch(url);
      const getResponse = await res.json()
      return getResponse;
    } catch (error) {
      throw error
    }

  },

  setPage() {
    return this.page += 1;
  },

  get query(){
    return this._query
  },
  set query(newQuery){
    this._query = newQuery;
  }
};

