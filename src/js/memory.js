export default class Memory {
  constructor(shortText, longText) {
    this.shortText = shortText;
    this.longText = longText;
    this.url = 'http://localhost:3333/allTickets';
  }

  save() {
    if (this.shortText !== null && this.longText !== null) {
      fetch(this.url);
    }
  }

  async load() {
    try {
      const response = await fetch(this.url);
      const tickets = await response.json();
      return tickets[1];
    } catch (error) {
      const err = new Error(error);
      return err;
    }
  }
}
