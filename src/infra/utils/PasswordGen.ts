import { PasswordGen } from "@src/application/password-generator";

export class PasswordGenImpl implements PasswordGen {
	constructor() {}

	static create(): PasswordGenImpl {	
		return new PasswordGenImpl()
	}

	generate() {
		const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const lowercase = "abcdefghijklmnopqrstuvwxyz";
		const numbers = "0123456789";
		const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

		const allChars = uppercase + lowercase + numbers + specialChars;

		let password = [
			uppercase[Math.floor(Math.random() * uppercase.length)],
			lowercase[Math.floor(Math.random() * lowercase.length)],
			numbers[Math.floor(Math.random() * numbers.length)],
			specialChars[Math.floor(Math.random() * specialChars.length)]
		];

		for (let i = password.length; i < 6; i++) {
			password.push(allChars[Math.floor(Math.random() * allChars.length)]);
		}

		// Acak urutan karakter
		password = password.sort(() => Math.random() - 0.5);

		return password.join("");
	}
}