let fs = require('fs');
const path = require('path');

function collapseMultipleNewLines(text) {
  return text.replace(/(\\n\\n\\n\\n\\n\\n)/g, `
  
  `);
}
function collapseNewLines(text) {
  return text.replace(/(\\n)/g, `
  `);
}

function collapseCarriage(text) {
  return text.replace(/(\\t|\\r)/g, `
  
  `);
}
function collapseCarriagesAndSpaces(text) {
  return text.replace(/(\\n\\n\\n|\\t\\t\\t|\\n\\t\\t|\\n\\t\\n)/g, ``);
}

let dir = ['bornfitness', 'gethealthyu', 't-nation'];
let base_dir = '/Users/mac/Documents/development/scrapper/node-scrapper/blogs/';
let output_dir = `${base_dir}/formatted`;

for (let i = 0; i < dir.length; i++) {
  let each_dir = dir[i];
  format(`${base_dir}/${each_dir}`, each_dir);
}

function format(dir_path, dir_name) {
  fs.mkdirSync(`${output_dir}/${dir_name}`, {recursive: true});
  fs.readdir(dir_path, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(file_name => {
      let file = `${dir_path}/${file_name}`;
      fs.readFile(file, 'utf8', function (err, content) {
        if (err) {
          //return console.log(err);
        }
        let result = collapseMultipleNewLines(content);
        result = collapseCarriagesAndSpaces(result);
        result = collapseCarriage(result);
        result = collapseNewLines(result);

        fs.writeFile(`${output_dir}/${dir_name}/${file_name}`, result, 'utf8', function (err) {
          if (err) {
            return console.log(err);
          }
        });
      });
    });
    //console.log(files)
  });
}
