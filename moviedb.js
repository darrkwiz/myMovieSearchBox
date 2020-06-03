class MovieDB {
    constructor() {
        this.key = "fbe8e0c35cbd3f48681f3e7f709e5e60";
    }

    getData(url) {
        const baseURL = `https://api.themoviedb.org/3/search/movie?`;
        const data = fetch(`${baseURL}api_key=${this.key}&language=en-US&query=${url}`);
        return data;
    }

    getMovie(id) {
        const baseURL = 'https://api.themoviedb.org/3/movie/';
        const data = fetch(`${baseURL}${id}?api_key=${this.key}&language=en-US`);
        return data;
    }
}
