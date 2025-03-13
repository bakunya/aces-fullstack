export interface ICrypt {
	encrypt<T>(raw: T): Promise<string>;
	decrypt<T>(encryptData: string): Promise<T>;
}