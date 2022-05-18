import { fetchData } from "./src/fetch-data";
import { createSql } from './src/create-sql';

// just runs the fetchData script, maybe this can be extended as necessary
const run = async () => {
    const data = await fetchData();
    createSql(data);
}

run();