export interface IUsecase<Args extends any[] = [], Result = unknown> {
	execute(...args: Args): Promise<Result>
}