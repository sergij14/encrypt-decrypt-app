const { Transform } = require("node:stream");
const fs = require("fs/promises");

class Encrypt extends Transform {
  _transform(chunk, encoding, cb) {
    console.log(chunk.toString("utf-8"));
    this.push(chunk);
  }
}

(async () => {
  const readFileHanlde = await fs.open("read.txt", "r");
  const writeFileHanlde = await fs.open("write.txt", "w");

  const readStream = readFileHanlde.createReadStream();
  const writeStream = writeFileHanlde.createWriteStream();

  const encrypt = new Encrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();
