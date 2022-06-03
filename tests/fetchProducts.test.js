require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  test('ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    await fetchProducts('computador')
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  });
  test('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  test('ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: `You must provide an url`', async () => {
    try{
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
