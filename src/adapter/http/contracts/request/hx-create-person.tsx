export type PersonRequest = {
	nip: string;
	name: string;
	email: string;
	username: string;
	hash: string | null;
	jenis_kelamin: string;
}

export type BodyRequest<M = string> = {
	persons: M
}

export enum HxCreatePersonUrlParam {
	batch_id = "batch_id",
}