const saveCartItems = (argument) => {
  localStorage.setItem('cartItems', argument);
  console.log(argument);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
