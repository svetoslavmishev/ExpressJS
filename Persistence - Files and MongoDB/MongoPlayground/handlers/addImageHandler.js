const fs = require('fs');
const formidable = require('formidable');
const path = './views/index.html';

const Image = require('./../models/ImageSchema');
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

let addImage = (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }

    fields.tags = fields.tagsID.split(',');
    fields.tags.pop();

    let image = new Image(fields)
      .save()
      .then(img => {
        Tag
          .update({ _id: { $in: img.tags } },
            { $push: { images: img._id } },
            { multi: true })
          .exec();
        renderHtml(res);
      })
      .catch(err => {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.write('500 Server Error');
        res.end();
      });
  });
};

let deleteImg = (req, res) => {
  let id = req.pathquery.id;
  Image.deleteOne({ _id: id })
    .then(() => {
      res.writeHead(302, {
        location: '/'
      });
      res.end();
    })
    .catch(err => {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.write('500 Server Error');
      res.end();
    });
};

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res);
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res);
  } else {
    return true;
  }
};
