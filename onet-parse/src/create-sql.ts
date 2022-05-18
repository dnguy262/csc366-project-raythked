/**
 * This file creates the sql statements and inserts into the sql file
 */
import fs from 'fs';
import { ONETJobDetailResponse } from './types';

/**
 * Creates the following sql files:
 * - onet-job-profiles.sql 
 * - onet-job-info.sql
 * - recommended-job-list.sql
 */
export const createSql = (data: Array<ONETJobDetailResponse>) => {
    let onetJobInfoInserts = '';
    let onetJobProfilesInserts = '';
    let recomnededJobListInserts = '';
    // TODO: finalize create table statements so the insert statement makes sense
    // onet job info is pretty straight forward
    // onet job profile needs some way to map back to onet-job-info
    // recommended-job-list I am not sure on

    fs.writeFileSync('onet-job-info.sql', onetJobInfoInserts);
    fs.writeFileSync('onet-job-profiles.sql', onetJobProfilesInserts);
    fs.writeFileSync('recommended-job-list.sql', recomnededJobListInserts);
}