const fs = require('fs');
let storage = {};
let dbFilePath = './storage.json';

let put = (key, value) => {
    if (typeof (key) !== 'string') {
        console.log(`The key must be a string!`);
        return;
    }
    if (storage.hasOwnProperty(key)) {
        console.log(`The key already exist!`);
        return;
    }

    return storage[key] = value;
};

let get = (key) => {
    checkKey(key);
    return storage[key];
};

let getAll = () => {
    if (Object.keys(storage).length === 0) {
        return `There are no items in the storage.`;
    }

    return storage;
};

let update = (key, newValue) => {
    checkKey(key);

    return storage[key] = newValue;
};

let deleteItem = (key) => {
    checkKey(key);

    delete storage[key];
};

let clear = () => {
    storage = {};
};

let save = () => {
    fs.writeFileSync('./storage.json', JSON.stringify(storage), 'utf8');
};

let load = () => {
    clear();
    let data = JSON.parse(fs.readFileSync('./storage.json'), 'utf8');
    storage = data;
};

let saveAsync = (callback) => {
    let dataJson = JSON.stringify(storage);

    fs.writeFile(dbFilePath, dataJson, 'utf-8', (err, data) => {
        if (err) {
            return;
        }

        callback();
    });
};

let loadAsync = (callback) => {
    fs.readFile(dbFilePath, 'utf-8', (err, data) => {
        if (err) {
            return;
        }

        storage = JSON.parse(data);
        callback();
    });
};

function checkKey(key) {
    if (typeof (key) !== 'string') {
        console.log(`The key must be a string!`);
        return;
    }
    if (!storage.hasOwnProperty(key)) {
        console.log(`The key already exist!`);
        return;
    }
}

module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load,
    saveAsync: saveAsync,
    loadAsync: loadAsync
};