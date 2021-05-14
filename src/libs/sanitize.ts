async function find(id, key, results) {
  let tcheckOrder = ["users.json", "informations.json", "jobs.json"]; // tcheck data with the good order
  for (const i in tcheckOrder) {
    const source = tcheckOrder[i];
    if (
      results[source].hasOwnProperty(id) &&
      results[source][id].hasOwnProperty(key)
    ) {
      const result = results[source][id][key];
      if (result === "#ERROR") {
        continue;
      }
      return result;
    }
  }
}

async function getIdsFromSource(results) {
  let idsArray: Array<string> = [];
  for (const [key, value] of Object.entries(results)) {
    // get all ids
    idsArray = idsArray.concat(Object.keys(value));
  }
  const uniqueIds: Array<string> = [];
  for (let value of idsArray) {
    if (uniqueIds.indexOf(value) === -1) {
      // add value only if not already in the array
      uniqueIds.push(value);
    }
  }
  return uniqueIds; // so that we get a unique list of ids
}

async function modifyName(name) {
  if (!name) {
    return name;
  }
  const replaceName = name
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/1/g, "i")
    .replace(/0/g, "o");

  return replaceName[0].toUpperCase() + replaceName.substring(1); // uppercase first lette like result.txt expectation.
}

async function modifyCity(city) {
  if (!city) {
    return city;
  }

  const allLower = city.toLowerCase().trim();
  return allLower[0].toUpperCase() + allLower.substring(1);
}

function isBlank(value) {
  return value === undefined || value === null;
}

async function run(results) {
  let final = {};
  const allIds = await getIdsFromSource(results);
  for (const i in allIds) {
    const id = allIds[i];
    let finalObject = {};

    // get datas
    const originalName = await find(id, "name", results);
    const originalAge = await find(id, "age", results);
    const originalJob = await find(id, "job", results);
    const originalCity = await find(id, "city", results);

    // modify strings
    const transformedName = await modifyName(originalName);
    const transformedCity = await modifyCity(originalCity);

    // save to final object
    if (!isBlank(transformedName)) {
      finalObject["name"] = transformedName;
    }
    if (!isBlank(originalAge)) {
      finalObject["age"] = originalAge;
    }
    if (!isBlank(originalJob)) {
      finalObject["job"] = originalJob;
    }
    if (!isBlank(transformedCity)) {
      finalObject["city"] = transformedCity;
    }
    final[id] = finalObject;
  }
  return final;
}

export default {
  run
};
