export default class Memory {
  constructor(shortText, longText) {
    this.shortText = shortText;
    this.longText = longText;
    this.url = 'http://localhost:3333';
  }

  save() {
    if (this.shortText !== null && this.longText !== null) {
      fetch(this.url);
    }
  }

  load() {
    fetch(this.url).then((resolve) => console.log(resolve.json()));
  }
}
