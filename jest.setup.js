import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet('https://dummyjson.com/products').reply(200, {
    products: [
        { id: 1, title: 'Product 1', price: 100, thumbnail: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Product 2', price: 200, thumbnail: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Product 3', price: 300, thumbnail: 'https://via.placeholder.com/150' }
    ],
});

mock.onGet(/https:\/\/dummyjson\.com\/products\/(\d+)/).reply(config => {
    const productId = config.url.split('/').pop();
    const product = {
        1: { id: 1, title: 'Product 1', price: 100, thumbnail: 'https://via.placeholder.com/150' },
        2: { id: 2, title: 'Product 2', price: 200, thumbnail: 'https://via.placeholder.com/150' },
        3: { id: 3, title: 'Product 3', price: 300, thumbnail: 'https://via.placeholder.com/150' }
    }[productId];

    return [200, product];
});

mock.onAny().reply(500, {
    message: 'Network Error'
});