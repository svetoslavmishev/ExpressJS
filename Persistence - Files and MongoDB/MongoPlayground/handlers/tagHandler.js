const fs = require('fs');
const formidable = require('formidable');
const path = './views/index.html';

const Tag = require('./../models/TagSchema');

let renderHtml = (res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    let dispalyTags = '';

    Tag.find({})
      .then(tags => {
        for (let tag of tags) {
          dispalyTags += `<div class='tag' id="${tag._id}">${tag.tagName}</div>`;
        }
        data = data
          .toString()
          .replace(`<div class='replaceMe'></div>`, dispalyTags);
        res.end(data);
      });
  });
};

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
      }

      let tag = new Tag(fields)
        .save()
        .then(tag => {
          renderHtml(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  } else {
    return true;
  }
};
