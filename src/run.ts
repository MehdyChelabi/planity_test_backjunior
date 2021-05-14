import extract from "./libs/extract.js";
import backup from "./libs/backup.js";
import sanitize from "./libs/sanitize.js";

const start = async () => {
  // run extracts and retrieve all results
  const results = await extract.run();
  // console.log(results);
  // save data extract for saving them localy
  await backup.save(results);
  // sanitize datas to match with the expect result
  const sanitizeDatas = await sanitize.run(results);
  console.log(sanitizeDatas);
};

start();
