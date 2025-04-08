export enum AppErrorType {
	EntityError = 'EntityError',
	CryptoError = 'CryptoError',
	UnknownError = 'UnknownError',
	DatabaseError = 'DatabaseError',
	NotFoundError = 'NotFoundError',
	RouteError = 'RouteError',
	RequestError = 'RequestError',
	DateError = 'DateError',
	ConversionError = 'ConversionError'
}


export class AppError extends Error {
	private constructor(
		public readonly type: string, 
		public readonly message: string,
		public readonly userMessage?: string
	) {
		super(message)
		Object.setPrototypeOf(this, new.target.prototype);
	}

	static database(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.DatabaseError, msg, userMessage);
	}

	static crypto(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.CryptoError, msg, userMessage);
	}

	static unknown(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.UnknownError, msg, userMessage);
	}

	static notFound(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.NotFoundError, msg, userMessage);
	}

	static entity(entity: string, msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.EntityError, `${entity}: ${msg}`, userMessage);
	}

	static route(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.RouteError, msg, userMessage);
	}

	static request(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.RequestError, msg, userMessage);
	}

	static date(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.DateError, msg, userMessage);
	}

	static conversion(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.ConversionError, msg, userMessage);
	}

	static usecase(msg: string, userMessage?: string): AppError {
		return new AppError(AppErrorType.UnknownError, msg, userMessage);
	}

	toString(): string {
		return `AppError: ${this.type} - ${this.message}`;
	}


}