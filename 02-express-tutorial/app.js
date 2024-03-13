console.log('Express Tutorial');

const express = require("express");
const { products } = require("./data");

//invoke express
const app = express();


// setup static and middleware
app.use(express.static("./public"));

// verify that the server is working
app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
});

// Get all products
app.get('/api/v1/products', (req, res) => {
    console.log('Get request for Products');
    res.json(products);     // products array
});

// Get a single product
app.get('/api/v1/products/:productID', (req, res) => {
    const { productID } = req.params;
    const product = products.find(product => product.id === parseInt(productID));

    if (!product) {
        return res.status(404).json({ message: "That product was not found." });
    }
    res.json(product);
});

// filter 
app.get('/api/v1/query', (req, res) => {
    let { search, limit, priceP } = req.query;
    let filteredProducts = [...products];

    if (search) {
        filteredProducts = filteredProducts.filter(product => product.name.startsWith(search));
    }

    if (priceP) {
        filteredProducts = filteredProducts.filter(product => product.price < +priceP);
    }

    if (limit) {
        filteredProducts = filteredProducts.slice(0, +limit);
    }

    res.json(filteredProducts);
});

// handle 404 Not Found responses
app.all('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
