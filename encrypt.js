const { Transform, Readable } = require("node:stream");
const fs = require("fs/promises");
const process = require("process");

if (process.argv[2] !== "--encrypt" || !process.argv[3]) {
  throw new Error("There is no text provided to encypt");
}

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
  const writeFileHanlde = await fs.open("encrypted.txt", "w");

  const buff = Buffer.from(process.argv[3]);
  const readStream = Readable.from(buff);
  const writeStream = writeFileHanlde.createWriteStream();

  const encrypt = new Encrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();
