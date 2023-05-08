import Route from '@ember/routing/route';

export default class MoviesRoute extends Route {
  async model() {
    const res = await fetch('http://localhost:4500/api/v1/movies');
    const { data } = await res.json();

    return data;
  }
}
