import { passwordGenerator } from "@browser/utils/pass-gen";
import Alpine from "alpinejs"
import Papa from "papaparse"

const errorMessage = {
	"01": "Jenis kelamin tidak boleh kosong",
	"02": "Jenis kelamin tidak valid (laki-laki/perempuan/pr/lk)",
	"03": "NIP tidak boleh kosong",
	"04": "NIP harus unik",
}

function isArrayUnique(array: any[]) {
	return new Set(array).size === array.length;
}

function toJSON(file: File): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const fr = new FileReader();
		fr.onload = (e) => {
			try {
				const t = e.target?.result;
				if (!t) return reject("File is empty")

				// @ts-expect-error
				const x = (Papa.parse(t)?.data ?? []).filter(y => y.length === 6);

				x.shift();
				if (!x.length) return;

				const nipTmp: any[] = []

				// @ts-ignore
				const y = x.map((v) => {
					const gender = v[1]?.trim()?.toLowerCase() ?? "";
					if (!gender) return reject("01");
					const conditions = [
						(gender == "p" || gender == "l"),
						(gender == "pr" || gender == "lk"),
						(gender == "perempuan" || gender == "laki-laki"),
					]
					if (!conditions.some(cond => cond)) {
						return reject("02")
					}
					if (!v[2]?.trim()) return reject("03")

					nipTmp.push(v[2])

					return {
						nip: v[2].trim(),
						hash: v[5].trim(),
						name: v[0].trim(),
						email: v[3].trim(),
						username: v[4].trim(),
						jenis_kelamin: v[1].trim(),
					}
				});

				if (!isArrayUnique(nipTmp)) return reject("04")

				return resolve(y);
			} catch (error) {
				reject(error);
			}
		};

		fr.onerror = reject;
		fr.readAsText(file);
	});
}

// @ts-ignore
window.uploadPerson = function () {
	return {
		data: undefined,
		fileName: undefined,
		errorMessage: undefined,
		resetFile() {
			this.data = undefined
			this.fileName = undefined
			this.errorMessage = undefined
			// @ts-ignore
			document.getElementById('file-upload').value = null
		},
		async changeFile(e: Event) {
			this.data = undefined
			this.errorMessage = undefined
			try {
				const file = (e.target as HTMLInputElement)?.files?.[0]
				if (!file) return;
				// @ts-ignore
				this.data = await toJSON(file)
				// @ts-ignore
				this.fileName = file.name
			} catch (e: any) {
				// @ts-ignore
				const message = errorMessage[e]
				if (message) {
					this.errorMessage = message
				} else {
					// @ts-ignore
					this.errorMessage = "Something went wrong!"
				}
			}
		},
		init() {
			// @ts-ignore
			this.$watch('data', () => {
				// @ts-ignore
				if (this.$refs.personsInput) {
					// @ts-ignore
					this.$refs.personsInput.value = JSON.stringify(this.data);
				}
			});
		}
	}
}

// @ts-ignore
window.uploadedPerson = function () {
	return {
		id: undefined,
		nip: undefined,
		hash: undefined,
		name: undefined,
		email: undefined,
		gender: undefined,
		username: undefined,
		plain: undefined,
		setPerson(person: any) {
			person = JSON.parse(person) as {
				id: string,
				name: string,
				nip: string,
				email: string,
				gender: string,
				username: string,
				plain?: string,
			}
			this.id = person.id
			this.nip = person.nip
			this.name = person.name
			this.plain = person.plain
			this.email = person.email
			this.gender = person.gender
			this.username = person.username
		},
		deletePerson() {
			const pass = passwordGenerator()
			this.id = undefined
			this.nip = undefined
			this.name = undefined
			this.email = undefined
			this.gender = undefined
			this.username = undefined
			// @ts-ignore
			this.hash = pass
			// @ts-ignore
			this.plain = pass
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	Alpine.start()
})