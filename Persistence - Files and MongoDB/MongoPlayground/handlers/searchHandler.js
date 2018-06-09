const fs = require('fs');
const Image = require('./../models/ImageSchema');
const Tag = require('./../models/TagSchema');
//const mongoose = require('mongoose');

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    fs.readFile('./views/results.html', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      let resultData = '';

      if (req.pathquery.tagName) {
        let tagsArr = req.pathquery.tagName.split(',')
          .filter(el => el.length > 0 && el !== 'Write tags separted by ');
        let criteria = {};

        if (tagsArr.length === 0) {
          Image.find(criteria)
            .then(images => {
              for (let image of images) {
                resultData += imageTemplate(image);
              }

              data = data
                .toString()
                .replace(`<div class='replaceMe'></div>`, resultData);
              res.end(data);
            }).catch(err => {
              handleError(err);
            });
        } else if (tagsArr.length > 0 && req.pathquery.beforeDate === '' && req.pathquery.afterDate === '') {
          criteria = { tagName: { $in: tagsArr } };

          Tag.find(criteria)
            .then(tag => {
              Image.find({ tags: { $in: tag } })
                .then(images => {
                  images = images.sort((a, b) => b.creationDate - a.creationDate);
                  for (let image of images) {
                    resultData += imageTemplate(image);
                  }

                  data = data
                    .toString()
                    .replace(`<div class='replaceMe'></div>`, resultData);
                  res.end(data);
                })
                .catch(err => {
                  handleError(err, res);
                });
            }).catch(err => {
              handleError(err, res);
            });
        } else if (tagsArr.length > 0 && req.pathquery.beforeDate !== '' || req.pathquery.afterDate !== '') {
          let before = new Date(req.pathquery.beforeDate);
          let after = new Date(req.pathquery.afterDate);
          let limit = Number(req.pathquery.Limit);

          Tag.find({ tagName: { $in: tagsArr } })
            .then(tag => {
              Image.find({ tags: { $in: tag }, creationDate: { $gt: after, $lt: before } })
                .limit(limit)
                .then(images => {
                  images = images.sort((a, b) => b.creationDate - a.creationDate);
                  for (let image of images) {
                    resultData += imageTemplate(image);
                  }

                  data = data
                    .toString()
                    .replace(`<div class='replaceMe'></div>`, resultData);
                  res.end(data);
                })
                .catch(err => {
                  handleError(err, res);
                });
            }).catch(err => {
              handleError(err, res);
            });
        }
      }
    });
  } else {
    return true;
  }
};

function imageTemplate(image) {
  return `<fieldset id="${image._id}" => <legend>${image.imageTitle}:</legend> 
  <img src="${image.imageUrl}">
  </img><p>${image.description}<p/>
  <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
  </button> 
  </fieldset>`;
}

function handleError(err, res) {
  if (err) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.write('500 Server Error');
    res.end();
  }
}
