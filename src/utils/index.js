const getRandomElement = (array) => {
  if (array.length === 0) {
    throw new Error('El arreglo está vacío');
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
const sortPokemonsByName = (array, typeOrder) => {
  if (typeOrder === 'asc') {
    return array.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else {
    return array.sort((a, b) => (a.name < b.name ? 1 : -1));
  }
};
export default {
  sortPokemonsByName,
  getRandomElement
};
