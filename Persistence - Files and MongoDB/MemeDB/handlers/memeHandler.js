const db = require('./../config/dataBase');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');
const formidable = require('formidable');
const randomstring = require("randomstring");

const viewAddMemePath = './views/addMeme.html';
const viewAllPath = './views/viewAll.html';
const viewDetailPath = './views/details.html';

let generateMeme = (fields, files) => {
  return {
    id: randomstring.generate(9),
    title: fields.memeTitle,
    memeSrc: files.meme.path,
    description: fields.memeDescription,
    privacy: fields.status,
    dateStamp: Date.now()
  };
};

let viewAll = (req, res) => {
  fs.readFile(viewAllPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let allMemes = db.getDb().filter(meme => meme.privacy === 'on')
      .sort((a, b) => b.dateStamp - a.dateStamp);
    let memeStr = '';

    for (let meme of allMemes) {
      memeStr += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
      </div>`;
    }

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeStr);
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    res.end(data);
  });
};

let viewAddMeme = (req, res) => {
  fs.readFile(viewAddMemePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    res.end(data);
  });
};

let addMeme = (req, res) => {
  let form = new formidable.IncomingForm();

  form.on('error', (err) => {
    console.log(err);
  }).on('fileBegin', (name, file) => {
    //CREATE NEW FOLDER IF FILES ARE MORE THAN 10
    let folderName = Math.ceil(db.getDb().length / 10);
    let fileName = randomstring.generate(10) + '.jpg';

    if (db.getDb().length > 10) {
      fs.mkdir(`./public/memeStorage/${folderName}`, function (err) {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    file.path = `./public/memeStorage/${folderName}/${fileName}`;
  });

  //PARSE THE UPLOAD FORM
  form.parse(req, (err, fields, files) => {
    let newMeme = generateMeme(fields, files);

    //ADD TO DATABASE
    db.add(newMeme);

    //SAVE TO DATABASE
    db.save()
      .then(() => {
        viewAll(req, res);
      }).catch(err);
  });
};

let getDetails = (req, res) => {
  fs.readFile(viewDetailPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let memeQueryID = querystring.parse(url.parse(req.url).query).id;
    let targetedMeme = db.getDb()
      .find(meme => meme.id === memeQueryID);

    let memeDetailReplacer = `<div class="content">
    <img src="${targetedMeme.memeSrc}" alt=""/>
    <h3>Title  ${targetedMeme.title}</h3>
    <p> ${targetedMeme.description}</p>
    <a href="${targetedMeme.memeSrc}" download="${targetedMeme.title}.jpg">
    <button class="btn">
    <i class="fa fa-download"></i> Download Image!</button>
    </a> 
    </div>`;

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeDetailReplacer);
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    res.end(data);
  });
};

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res);
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res);
  } else {
    return true;
  }
};
