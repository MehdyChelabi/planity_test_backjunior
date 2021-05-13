import extract from "./libs/extract.js";

const start = async () => {
  // run extracts and retrieve all results
  const results = await extract.run();
  console.log(results);
};

start();
