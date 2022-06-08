const getSavedCartItems = () => {
  const storageElement = localStorage.getItem('cartItems');
  return storageElement;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
