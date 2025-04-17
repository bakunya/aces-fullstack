export type PersonMutationRequest = {
	person_id: string;
	person_nip: string;
	person_name: string;
	person_email: string;
	person_gender: string
	person_username: string;
	person_password: string;
}


export enum HxPersonMutationRequestUrlParam {
	batch_id = "batch_id",
}