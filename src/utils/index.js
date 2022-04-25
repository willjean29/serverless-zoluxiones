const transformDataPeople = (originalData) => {
  // get values
  const values = Object.values(originalData);
  const objectFormatted = {};

  objectFormatted.nombre = values[0];
  objectFormatted.altura = values[1];
  objectFormatted.peso = values[2];
  objectFormatted.cabello_color = values[3];
  objectFormatted.piel_color = values[4];
  objectFormatted.ojos_color = values[5];
  objectFormatted.nacimiento = values[6];
  objectFormatted.genero = values[7];
  objectFormatted.mundo_natal = values[8];
  objectFormatted.peliculas = values[9];
  objectFormatted.especies = values[10];
  objectFormatted.vehiculos = values[11];
  objectFormatted.naves_estelares = values[12];
  objectFormatted.creado = values[13];
  objectFormatted.editado = values[14];
  objectFormatted.url = values[15];

  return objectFormatted;
};

const validateKeys = (data) => {
  const keys = Object.keys(data);

  const validKeys = ["altura", "cabello_color", "genero", "nacimiento", "nombre", "ojos_color", "peso", "piel_color"];

  const isValidKeys = JSON.stringify(keys.sort()) === JSON.stringify(validKeys);

  return isValidKeys;
};

module.exports = {
  transformDataPeople,
  validateKeys,
};
