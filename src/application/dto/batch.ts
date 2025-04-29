export type BatchDTO = {
	uuid: string;
	organization_uuid: string;
	token: string;
	title: string;
	split: number;
	status: number;
	created: string;
	regrouping: number;
	organization_name: string;
	time1_start?: string;
	time2_start?: string;
	time3_start?: string;
	time4_start?: string;
	time1_end?: string;
	time2_end?: string;
	time3_end?: string;
	time4_end?: string;
	batch_time_start?: string;
	batch_time_end?: string;
	updated?: string;
}
