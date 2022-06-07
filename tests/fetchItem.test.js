require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('Verifica se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  test('Execute a função fetchProducts com o argumento "MLB1615760527" e teste se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1341706310');
    expect(fetch).toBeCalled();
  });
  test('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toBeCalledWith(url);
  });
  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  test('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
