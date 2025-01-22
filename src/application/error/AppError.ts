export enum AppErrorType {
	CryptoError = 'CryptoError',
	UnknownError = 'UnknownError',
	DatabaseError = 'DatabaseError',
	NotFoundError = 'NotFoundError',
}

export class AppError extends Error {
	private constructor(public readonly type: string, public readonly message: string) {
		super(message)
		Object.setPrototypeOf(this, new.target.prototype);
	}

	static database(msg: string): AppError {
		return new AppError(AppErrorType.DatabaseError, msg);
	}

	static crypto(msg: string): AppError {
		return new AppError(AppErrorType.CryptoError, msg);
	}

	static unknown(msg: string): AppError {
		return new AppError(AppErrorType.UnknownError, msg);
	}

	static notFound(msg: string): AppError {
		return new AppError(AppErrorType.NotFoundError, msg);
	}

	toString(): string {
		return `AppError: ${this.type} - ${this.message}`;
	}
}