export enum BatchDeploymentUrlParam {
	batch_id = "batch_id",
	time_type = "time_type",
}

export type BatchDeploymentBody = {
	time_start_date: string,
	time_start_time: string,
	time_end_date: string,
	time_end_time: string
}