const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const cardNumber = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;

const printedName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-'. ]+$/;

const securityCode = /^[0-9]{3}/;

const cpf = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;

export const RegExHelper = {
  password,
  cardNumber,
  securityCode,
  printedName,
  cpf,
};
