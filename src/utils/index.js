const getRandomElement = (array) => {
  if (array.length === 0) {
    throw new Error('El arreglo está vacío');
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
export default getRandomElement;