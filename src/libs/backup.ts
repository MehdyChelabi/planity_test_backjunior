import { promises as fs } from "fs";

async function storeToLocalFs(filename, content) {
  return await fs.writeFile(`save/${filename}`, JSON.stringify(content));
}

const save = async function(results) {
  var tabResults = Object.entries(results);
  for (const [key, value] of tabResults) {
    try {
      await storeToLocalFs(key, value);
      console.info(`✅  Successfully save ${key}`);
    } catch (e) {
      console.error(`Error for saving backup locally for ${key}:`);
      console.error(e);
    }
  }
};

export default {
  save
};
