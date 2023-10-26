const { Transform } = require("node:stream");
const fs = require("fs/promises");

class Encrypt extends Transform {
  _transform(chunk, encoding, cb) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 255) {
        chunk[i] = chunk[i] + 1;
      }
    }
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
