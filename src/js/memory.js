export default class Memory {
  constructor() {
    this.url = 'https://rebikhub-http.herokuapp.com';
    this.getAllTickets = '?allTickets';
    this.getId = '?ticketById&id=';
    this.getIdDelete = '?deleteId&id='; // <id>
    this.getStatusId = '?statusId&id=';
    this.postCreate = '?createTicket';
  }

  async save(ticket) {
    const response = await fetch(`${this.url}${this.postCreate}`, {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
    const tickets = await response.text();
    console.log(`Server response: ${tickets}`);
  }

  async load() {
    try {
      const response = await fetch(`${this.url}${this.getAllTickets}`);
      const tickets = await response.json();
      return tickets;
    } catch (error) {
      const err = new Error(error);
      return err;
    }
  }

  async loadId(id) {
    try {
      const response = await fetch(`${this.url}${this.getId}${id}`);
      const result = await response.text();
      return result;
    } catch (error) {
      const err = new Error(error);
      return err;
    }
  }

  async deleteId(id) {
    try {
      const response = await fetch(`${this.url}${this.getIdDelete}${id}`);
      const result = await response.text();
      return result;
    } catch (error) {
      const err = new Error(error);
      return err;
    }
  }

  async editStatusId(id) {
    try {
      const response = await fetch(`${this.url}${this.getStatusId}${id}`);
      const description = await response.text();
      return description;
    } catch (error) {
      const err = new Error(error);
      return err;
    }
  }
}
