const { Transform } = require("node:stream");
const fs = require("fs/promises");

class Decrypt extends Transform {
  _transform(chunk, encoding, cb) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 255) {
        chunk[i] = chunk[i] - 1;
      }
    }
    this.push(chunk);
  }
}

(async () => {
  const readFileHanlde = await fs.open("encrypted.txt", "r");
  const writeFileHanlde = await fs.open("decrypted.txt", "w");

  const readStream = readFileHanlde.createReadStream();
  const writeStream = writeFileHanlde.createWriteStream();

  const decrypt = new Decrypt();

  readStream.pipe(decrypt).pipe(writeStream);
})();
