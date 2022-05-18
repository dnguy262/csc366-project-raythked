export interface ONETStemJobResponse {
    occupation_type: string,
    occupation: Array<OccupationSchema>
    total: number;
};

export interface ONETJobDetailResponse {
    code: string;
    title: string;
    tags: Tag;
    description: string;
    sample_of_report_job_titles: {
        title: Array<string>;
    };
    also_see: Array<OccupationSchema>;
    updated: Updated;
    summary_resources: Array<Resource>;
    details_resources: Array<Resource>;
    custom_resources: Array<Resource>;
};

type OccupationSchema = {
    href: string;
    code: string;
    title: string;
    tags: Tag;
    stem_occupation_type: StemOccupationType;
    job_family: JobFamily;
};

type Resource = {
    href: string;
    title: string;
}

type Tag = {
    bright_outlook: boolean;
    green: false;
};

type StemOccupationType = {
    code: number;
    name: string;
};

type JobFamily = {
    code: string;
    name: string;
};

type Updated = {
    partial: boolean;
    year: number;
    resource_updated: Array<ResourceUpdated>;
}

type ResourceUpdated = {
    title: string;
    source: string;
    year: number;
}