import util from "util";
import request from "request";

const informations_url = process.env.informations_url;
const jobs_url = process.env.jobs_url;
const user_url = process.env.user_url;

async function run() {
  // didn't know if i can use axios for this test so i used 'request'
  const requestToPromise = util.promisify(request);
  // Call all sources in parallel to gain in processing time

  try {
    // wait until all request promises in the array resolve
    const results = await Promise.all([
      requestToPromise(informations_url),
      requestToPromise(jobs_url),
      requestToPromise(user_url)
    ]);

    return {
      "informations.json": JSON.parse(results[0].body),
      "jobs.json": JSON.parse(results[1].body),
      "users.json": JSON.parse(results[2].body)
    };
  } catch (e) {
    console.error(e);
  }
}

export default {
  run
};
