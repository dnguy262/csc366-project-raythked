/**
 * This file creates the sql statements and inserts into the sql file
 */
import fs from 'fs';
import { ONETJobDetailResponse } from './types';

/**
 * Creates the following sql files:
 * - onet-job-profiles.sql 
 * - onet-job-info.sql
 */
export const createSql = (data: Array<ONETJobDetailResponse>) => {
    let onetJobInfoInserts = 'INSERT INTO ONETJobInfo(Code, Title, IsStem, Description, BrightOutlook, Green) \nVALUES';
    let onetJobProfilesInserts = 'INSERT INTO Profile(Name, Category, Code) \nVALUES';

    data.forEach(({ code, description, tags, title }, index) => {
        const { bright_outlook, green } = tags;
        // escapes any single quotes in the description 
        const escapedDescription = description.replace(/'/g, "''");
        onetJobInfoInserts += `\n('${code}', '${title}', true, '${escapedDescription}', ${bright_outlook}, ${green})`;
        onetJobProfilesInserts += `\n('${title}', 'ONET', '${code}')`;
        onetJobInfoInserts += index === data.length - 1 ? ';' : ',';
        onetJobProfilesInserts += index === data.length - 1 ? ';' : ',';
    });

    fs.writeFileSync('sql/onet-job-info.sql', onetJobInfoInserts);
    fs.writeFileSync('sql/onet-job-profiles.sql', onetJobProfilesInserts);
}