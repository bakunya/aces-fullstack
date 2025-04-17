import { Hash } from '@src/application/crypto/Hash'
import bcrypt from 'bcryptjs'

export class HashImpl implements Hash {
	constructor() { }

	static create(): HashImpl {
		return new HashImpl()
	}

	async hash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(12)
		const hash = await bcrypt.hash(password, salt)
		return hash
	}

	async compare(password: string, hash: string): Promise<boolean> {
		const compare = await bcrypt.compare(password, hash)
		return compare
	}
}