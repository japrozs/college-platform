import fs from "node:fs";

// const COLLEGES = { entities: [] };

// const data = JSON.parse(fs.readFileSync("new-data.json", "utf-8"));
const data = JSON.parse(fs.readFileSync("processed-data.json", "utf-8"));
// data.results.forEach((result) => {
data.entities.forEach((result) => {
    // COLLEGES.entities.push(...result.entities);
    // console.log(result.content.facts[2].label === "SAT Range");
    if (Object(result.badge).hasOwnProperty("display")) {
        console.log(result.badge.display);
    } else {
        console.log(JSON.stringify(result, null, 4));
    }
});

// fs.writeFileSync("processed-data.json", JSON.stringify(COLLEGES), "utf-8");
