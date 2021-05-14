import extract from "./libs/extract.js";
import backup from "./libs/backup.js";
import sanitize from "./libs/sanitize.js";
import store from "./libs/store.js";

const start = async () => {
  // run extracts and retrieve all results
  const results = await extract.run();
  // save data extract for saving them localy
  await backup.save(results);
  // sanitize datas to match with the expect result
  const sanitizeDatas = await sanitize.run(results);
  // save the results locally
  await store.save(sanitizeDatas);
  // post the results to jsonBox
  await store.uploadToJsonBox(sanitizeDatas);
};

start();
