import EventEmitter from "eventemitter3";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    this._loading = document.querySelector("#progress");
    this.emit(Application.events.READY);
    this._load();
    this._loading.value = 0;
  }
  async _load() {
    const res = await fetch("https://swapi.boom.dev/api/planets");
    const data = await res.json();
    this._loading.max = data.count;
    for (let i = 0; i < 6; i++) {
      this._startLoading(i);
    }
  }
  _create(planetName) {
    const box = document.createElement("div");
    box.textContent = planetName;
    document.querySelector("#list").appendChild(box);
  }
  async _startLoading(page) {
    const res = await fetch(`https://swapi.boom.dev/api/planets?page=${page}`);
    const data = await res.json();
    data.results.forEach((planet) => {
      this._create(planet.name);
      this._loading.value++;
    });
  }
  _stopLoading() {
    this._loading.style.display = "none";
  }
  _render() {}
}
