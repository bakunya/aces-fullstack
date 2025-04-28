export interface Repository {
	begin(): Promise<void>;
	commit(): Promise<void>;
	rollback(): Promise<void>;
}