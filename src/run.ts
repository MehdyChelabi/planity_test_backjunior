import extract from "./libs/extract.js";
import backup from "./libs/backup.js";

const start = async () => {
  // run extracts and retrieve all results
  const results = await extract.run();
  console.log(results);

  await backup.save(results);
};

start();
