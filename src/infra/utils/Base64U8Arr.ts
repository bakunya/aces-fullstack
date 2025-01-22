export class Base64U8Arr {
	constructor() {
		return this
	}

	encode(u8arr: Uint8Array): string {
		const binaryString = String.fromCharCode(...u8arr);
		return btoa(binaryString);
	}

	decode(base64: string): Uint8Array {
		const binaryString = atob(base64);
		const length = binaryString.length;
		const array = new Uint8Array(length);
		for (let i = 0; i < length; i++) {
			array[i] = binaryString.charCodeAt(i);
		}
		return array;
	}
}