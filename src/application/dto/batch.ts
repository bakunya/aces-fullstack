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
	time1?: string;
	time2?: string;
	time3?: string;
	time4?: string;
	time1_end?: string;
	time2_end?: string;
	time3_end?: string;
	time4_end?: string;
	batch_timestamp_start?: string;
	batch_timestamp_end?: string;
	updated?: string;
}
