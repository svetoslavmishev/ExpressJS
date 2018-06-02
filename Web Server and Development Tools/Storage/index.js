const storage = require('./storage');

storage.load();
storage.put('first', 'firstValue');
storage.put('second', 'secondValue');
storage.put('third', 'thirdValue');
storage.put('fouth', 'fourthValue');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.delete('second');
storage.update('first', 'updatedFirst');
storage.save();
storage.clear();
console.log(storage.getAll());
storage.load();
console.log(storage.getAll());

storage.put('first', 'firsVal');
storage.put('second', 2);
storage.put('third', { 3: 'thirdVal' });
storage.put('fourth', [4]);
storage.saveAsync(() => {
    storage.loadAsync(() => console.log(storage.getAll()));
});
