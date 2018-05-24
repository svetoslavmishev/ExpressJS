let products = [];
let count = 1;

let getAll = () => {
    return products;
};

let add = (product) => {
    product.id = count++;
    products.push(product);
};

let findByName = (name) => {
    let product = null;
    for (let prod of products) {
        if (prod === name) {
            return prod;
        }
    }
    return product;
};

module.exports.products = {
    getAll,
    add,
    findByName
};