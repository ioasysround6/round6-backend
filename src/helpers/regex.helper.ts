const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const name = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-'/ ]+$/;

const cpf = /^[0-9]{11}/;

const telephone = /^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{7}$/;

const zipCode = /^[0-9]{8}$/;

export const RegExHelper = {
  password,
  name,
  cpf,
  telephone,
  zipCode,
};
