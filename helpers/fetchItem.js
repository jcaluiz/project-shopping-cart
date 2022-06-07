const fetchItem = async (product) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${product}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// console.log(fetchItem('MLB1615760527'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
