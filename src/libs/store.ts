import { promises as fs } from "fs";
import util from "util";
import request from "request";

async function save(objects) {
  await fs.writeFile(`save/results.json`, JSON.stringify(objects));
  console.info(`✅  Successfully save in save/results.json.`);
}

async function uploadToJsonBox(objects) {
  let finalArray: Array<any> = [];
  // stucture the final datas to upload
  for (const [key, value] of Object.entries(objects)) {
    let tmp: object = Object.assign({ id: key }, value);
    finalArray.push(tmp);
  }
  //   console.log(finalArray);
  const json_box_url = process.env.json_box_url;

  try {
    // didn't know if i can use axios for this test so i used 'request'
    util.promisify(request.post)({
      uri: json_box_url,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalArray)
    });
    console.info(
      `✅  Successfully save results.json in JsonBox: ${json_box_url}`
    );
  } catch (e) {
    console.error(
      `❌  Error for saving the results in JsonBox: ${json_box_url}`
    );
  }
}

export default {
  save,
  uploadToJsonBox
};
