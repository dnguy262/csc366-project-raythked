export interface Recommendation {
    job_id: string;
    job_code: string;
    job_name: string;
    job_desc: string;
    cos_similarity: number;
}