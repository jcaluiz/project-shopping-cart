const fetchProducts = async (product) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const promiseFetch = await fetch(url);
    const result = await promiseFetch.json();
    return result;
  } catch (error) {
    return error;
  }
};
console.log(fetchProducts('computador'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
