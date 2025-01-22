import { AppError } from "@src/application/error/AppError";
import { Base64U8Arr } from "@src/infra/utils/Base64U8Arr";

export class Crypto {
	static async generateEncryptKey(): Promise<string> {
		const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]) as CryptoKey;
		const exportedKey = await crypto.subtle.exportKey("raw", key) as ArrayBuffer;
		const jsonKey = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
		return jsonKey
	}

	constructor(private readonly subtle: SubtleCrypto, private readonly encryptKey?: string) { }

	async encrypt<T>(raw: T): Promise<string> {
		if (!this.encryptKey) {
			throw AppError.crypto("Encrypt key not found");
		}

		try {
			const binaryKey = atob(this.encryptKey)
				.split("")
				.map(char => char.charCodeAt(0));
			const rawKey = new Uint8Array(binaryKey);
			const importedKey = await this.subtle.importKey("raw", new Uint8Array(rawKey), { name: "AES-GCM" }, true, ["encrypt", "decrypt"]) as CryptoKey;

			const data = JSON.stringify(raw);
			const encoder = new Base64U8Arr()
			const iv = crypto.getRandomValues(new Uint8Array(12));
			const ivString = encoder.encode(iv);

			const data1 = new TextEncoder().encode(JSON.stringify(data));
			const encrypted1 = await this.subtle.encrypt({ name: "AES-GCM", iv: iv.buffer }, importedKey, data1);
			const base64 = encoder.encode(new Uint8Array(encrypted1));

			return btoa(JSON.stringify({
				iv: ivString,
				data: base64
			}))
		} catch (e: any) {
			throw AppError.crypto(e.message);
		}
	}

	async decrypt<T>(encryptData: string): Promise<T> {
		if (!this.encryptKey) {
			throw AppError.crypto("Encrypt key not found");
		}

		try {
			const binaryKey = atob(this.encryptKey)
				.split("")
				.map(char => char.charCodeAt(0));
			const rawKey = new Uint8Array(binaryKey);

			const { iv, data } = JSON.parse(atob(encryptData));

			const decoder = new Base64U8Arr()
			const ivUint8 = decoder.decode(iv).buffer as ArrayBuffer;
			const binnaryStr = decoder.decode(data).buffer as ArrayBuffer;

			const importedKey = await this.subtle.importKey("raw", new Uint8Array(rawKey), { name: "AES-GCM" }, true, ["encrypt", "decrypt"]) as CryptoKey;
			const decrypted1 = await this.subtle.decrypt({ name: "AES-GCM", iv: ivUint8 }, importedKey, binnaryStr)

			return JSON.parse(JSON.parse(new TextDecoder().decode(decrypted1)))
		} catch (e: any) {
			throw AppError.crypto(e.message);	
		}
	}
}