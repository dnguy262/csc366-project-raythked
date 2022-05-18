/**
 * This is a script that parses ONET web services endpoints to create
 * INSERT statements that will be ingested into our database.
 */
import axios from 'axios';

import { ONETJobDetailResponse, ONETStemJobResponse } from './types';

const axiosOptions = {
    mode: 'cors',
    auth: {
        username: 'raythked',
        password: '5638nqd'
    },
    headers: {
        'Accept': 'application/json'
    }
};

/** 
 * this one gets a list of all stem jobs, returns the code (ONET SOC CODE) 
 * https://services.onetcenter.org/reference/online/browse/browse_stem
*/
const fetchStemJobs = async (): Promise<ONETStemJobResponse> => {
    const promise = await axios.get('https://services.onetcenter.org/ws/online/stem_occupations/all?start=1&end=2000', {
        ...axiosOptions,
    });
    return promise.data;
};

/** 
 * supplying the ONET-OSC-CODE from the above endpoint returns a lot of the metadata we are looking for 
 * https://services.onetcenter.org/reference/online/occupation
*/
const fetchJobDetails = async (onetSocCode: string): Promise<ONETJobDetailResponse> => {
    // https://services.onetcenter.org/ws/online/occupations/[O*NET-SOC Code]/
    const promise = await axios.get(`https://services.onetcenter.org/ws/online/occupations/${onetSocCode}`, {
        ...axiosOptions,
    });
    return promise.data;
};

export const fetchData = async () => {
    const stemJobs = await fetchStemJobs();
    const requests = [];
    for (const { code } of stemJobs.occupation) {
        requests.push(fetchJobDetails(code));
    }
    const result = await Promise.all(requests);
    return result;
};
