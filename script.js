const elementFetchItem = document.querySelector('.cart__items');
const priceInHTML = document.querySelector('.total-price');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  elementFetchItem.removeChild(event.target);
};

const numbers = [];

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', () => {
    localStorage.removeItem(salePrice);
    const check = numbers.indexOf(parseFloat(salePrice), 0);
    if (check > -1) {
      numbers.splice(check, 1);
    }
    localStorage.setItem('calculo', JSON.stringify(numbers.reduce((acc, curr) => acc + curr, 0)));
    priceInHTML.innerHTML = parseFloat(JSON.parse(localStorage.getItem('calculo'))) || 0;
  });
  return li;
};

const append = async () => { 
  const product = await fetchProducts('computador');
  const elementDad = document.querySelector('.items');
  return product.results.forEach((element) => elementDad
    .appendChild(createProductItemElement(
      { sku: element.id, name: element.title, image: element.thumbnail },
      )));
};

const appendCartItems = async () => {
  const buttonAddItem = document.querySelectorAll('.item__add');
  return buttonAddItem
  .forEach((element) => element
  .addEventListener('click', async () => {
    const functionFetchItem = await fetchItem(element
      .parentNode.firstElementChild.innerText);
      const elementChild = elementFetchItem.appendChild(createCartItemElement({
        sku: functionFetchItem.id,
        name: functionFetchItem.title,
        salePrice: functionFetchItem.price,
      }));
      saveCartItems(elementFetchItem.innerHTML);
      localStorage.setItem(functionFetchItem.price, JSON.stringify(functionFetchItem.price));
      numbers.push(JSON.parse(localStorage.getItem(functionFetchItem.price)));
      localStorage.setItem('calculo', JSON.stringify(numbers.reduce((acc, curr) => acc + curr, 0)));
      priceInHTML.innerHTML = parseFloat(JSON.parse(localStorage.getItem('calculo')));
      return elementChild;
    }));
};
  
const getLocalStorage = () => {
  elementFetchItem.innerHTML = getSavedCartItems();
  elementFetchItem.addEventListener('click', (event) => {
    event.target.remove();
    saveCartItems(elementFetchItem.innerHTML);
  });
};

const calculatorPrice = () => {
  priceInHTML.innerHTML = parseFloat(JSON.parse(localStorage.getItem('calculo'))) || 0;
};

  async function render() {
    await append();
    await appendCartItems();
    getLocalStorage();
    calculatorPrice();
}

window.onload = () => {
  render();
};