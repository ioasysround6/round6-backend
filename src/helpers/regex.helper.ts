const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const cardNumber = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;

const printedName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-'. ]+$/;

const dueDate = /^(((0[123456789]|10|11|12)([/])([0-9][0-9])))$/;

const securityCode = /^[0-9]{3}$/;

const cpf = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;

export const RegExHelper = {
  password,
  cardNumber,
  securityCode,
  printedName,
  cpf,
  dueDate,
};
