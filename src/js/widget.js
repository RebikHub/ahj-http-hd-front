import Memory from './memory';

export default class Widget {
  constructor() {
    this.container = document.querySelector('#container');
    this.addTicketBtn = document.querySelector('.add-ticket');
    this.popup = document.querySelector('#pop-up');
    this.popupDelete = document.querySelector('#pop-up-delete');
    this.titlePopup = document.querySelector('.title-popup');
    this.btnCancel = document.querySelector('.btn-cancel');
    this.btnOk = document.querySelector('.btn-ok');
    this.inputShortText = document.querySelector('.input-short-text');
    this.inputLongText = document.querySelector('.input-long-text');
    this.btnDelOk = document.querySelector('.btn-delete-ok');
    this.btnDelCancel = document.querySelector('.btn-delete-cancel');
    this.delOrEditMain = null;
    this.shortText = null;
    this.longText = null;
    this.date = null;
    this.done = false;
  }

  events(tickets) {
    this.renderTickets(tickets);
    this.addTicketClick();
    this.addTicketCancel();
    this.addTicketOk();
    this.inputShortTicket();
    this.inputLongTicket();
    this.statusDone();
    this.deleteTicket();
    this.deleteTicketCancel();
    this.deleteTicketOk();
    this.editTicket();
    this.showDescription();
  }

  async renderTickets(tickets) {
    const ticket = await tickets;
    console.log(ticket);
    this.updateRender(ticket.name, ticket.description, ticket.created, ticket.status);
    // console.log(ticket.name, ticket.description, ticket.created, ticket.status);
  }

  addTicketClick() {
    this.addTicketBtn.addEventListener('click', () => {
      if (this.popup.classList.contains('none')) {
        this.titlePopup.textContent = 'Добавить тикет';
        this.popup.classList.remove('none');
      }
    });
  }

  addTicketCancel() {
    this.btnCancel.addEventListener('click', () => {
      if (!this.popup.classList.contains('none')) {
        this.popup.classList.add('none');
        this.inputShortText.value = null;
        this.inputLongText.value = null;
        this.shortText = null;
        this.longText = null;
      }
    });
  }

  addTicketOk() {
    this.btnOk.addEventListener('click', () => {
      if (!this.popup.classList.contains('none') && this.titlePopup.textContent === 'Добавить тикет') {
        this.popup.classList.add('none');
        this.ticketDate();
        this.updateRender(this.shortText, this.longText, this.date);
        this.newAddTicket(this.shortText, this.longText, this.date, this.done);
        this.inputShortText.value = null;
        this.inputLongText.value = null;
        this.shortText = null;
        this.longText = null;
        this.date = null;
      }
      if (!this.popup.classList.contains('none') && this.titlePopup.textContent === 'Изменить тикет') {
        this.popup.classList.add('none');
        this.delOrEditMain.children[0].children[1].textContent = this.shortText;
        this.delOrEditMain.children[1].textContent = this.longText;
        this.delOrEditMain.children[0].children[2].textContent = this.date;
        if (this.delOrEditMain.children[0].children[0].classList.contains('done')) {
          this.done = true;
        }
        this.newAddTicket(this.shortText, this.longText, this.date, this.done);
        this.inputShortText.value = null;
        this.inputLongText.value = null;
        this.shortText = null;
        this.longText = null;
        this.date = null;
        this.done = false;
      }
    });
  }

  ticketDate() {
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let hours = new Date().getHours();
    let minute = new Date().getMinutes();

    if (String(month).length === 1) {
      month = `0${month}`;
    }
    if (String(day).length === 1) {
      day = `0${day}`;
    }
    if (String(minute).length === 1) {
      minute = `0${minute}`;
    }
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    this.date = `${day}.${month}.${String(year).slice(2)} ${hours}:${minute}`;
  }

  updateRender(shortText, longText, date, done) {
    const main = document.createElement('div');
    const block = document.createElement('div');
    const long = document.createElement('div');
    block.classList.add('block');
    main.classList.add('main');
    for (let i = 0; i < 5; i += 1) {
      const inMain = document.createElement('div');
      inMain.classList.add('in-main');
      main.appendChild(inMain);
    }
    if (done === true) {
      main.children[0].classList.add('done');
    }
    main.children[0].classList.add('status');
    main.children[1].textContent = shortText;
    main.children[1].classList.add('short');
    main.children[2].textContent = date;
    main.children[2].classList.add('date');
    main.children[3].classList.add('edit');
    main.children[4].classList.add('delete');
    long.textContent = longText;
    long.classList.add('long', 'none');
    block.appendChild(main);
    block.appendChild(long);
    this.container.appendChild(block);
  }

  static newAddTicket(shortText, longText, date, done) {
    const ticket = {
      name: shortText,
      description: longText,
      created: date,
      status: done,
    };
    Memory.save(ticket);
  }

  statusDone() {
    this.container.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('status') && ev.target.classList.contains('done')) {
        ev.target.classList.remove('done');
      } else if (ev.target.classList.contains('status')) {
        ev.target.classList.add('done');
      }
    });
  }

  deleteTicket() {
    this.container.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('delete') && this.popupDelete.classList.contains('none')) {
        this.popupDelete.classList.remove('none');
        this.delOrEditMain = ev.target.closest('.block');
      }
    });
  }

  deleteTicketCancel() {
    this.btnDelCancel.addEventListener('click', () => {
      this.popupDelete.classList.add('none');
    });
  }

  deleteTicketOk() {
    this.btnDelOk.addEventListener('click', () => {
      this.popupDelete.classList.add('none');
      this.delOrEditMain.remove();
      this.delOrEditMain = null;
    });
  }

  editTicket() {
    this.container.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('edit') && this.popup.classList.contains('none')) {
        this.titlePopup.textContent = 'Изменить тикет';
        this.popup.classList.remove('none');
        this.delOrEditMain = ev.target.closest('.block');
        this.inputShortText.value = this.delOrEditMain.children[0].children[1].textContent;
        this.inputLongText.value = this.delOrEditMain.children[1].textContent;
      }
    });
  }

  showDescription() {
    this.container.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('short')) {
        const long = ev.target.closest('.block').children[1];
        if (long.classList.contains('none')) {
          long.classList.remove('none');
        } else {
          long.classList.add('none');
        }
      }
    });
  }

  inputShortTicket() {
    this.inputShortText.addEventListener('input', (ev) => {
      this.shortText = ev.target.value;
    });
  }

  inputLongTicket() {
    this.inputLongText.addEventListener('input', (ev) => {
      this.longText = ev.target.value;
    });
  }
}
