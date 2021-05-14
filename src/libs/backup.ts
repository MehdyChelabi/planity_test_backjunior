import { promises as fs } from "fs";

async function storeToLocalFs(filename, content) {
  return await fs.writeFile(`save/${filename}`, JSON.stringify(content));
}

const save = async function(results) {
  var tabResults: Array<any> = Object.entries(results);
  for (const [key, value] of tabResults) {
    // for each informations, jobs, users
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
