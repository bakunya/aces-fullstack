import { AppError } from "@src/application/error/AppError"

export enum SlotMode {
	ALL_TYPES = "ALL_TYPES",
	NO_SELF = "NO_SELF",
	NO_DISC = "NO_DISC",
	NO_CASE = "NO_CASE",
	NO_FACE = "NO_FACE",
	SELF_CASE = "SELF_CASE",
	SELF_DISC = "SELF_DISC",
	SELF_FACE = "SELF_FACE",
	CASE_DISC = "CASE_DISC",
	CASE_FACE = "CASE_FACE",
	DISC_FACE = "DISC_FACE",
	SELF_ONLY = "SELF_ONLY",
	CASE_ONLY = "CASE_ONLY",
	FACE_ONLY = "FACE_ONLY",
	DISC_ONLY = "DISC_ONLY",
}

export enum SlotType {
	SELF = "SELF",
	CASE = "CASE",
	FACE = "FACE",
	DISC = "DISC",
}


export class SlotModeMapping {
	static fromString(mode: string): SlotMode {
		try {
			return SlotMode[mode as keyof typeof SlotMode]
		} catch(_) {
			throw AppError.entity("SlotMode", "Invalid slot mode")
		}
	}
}

export class SlotTypeMapping {
	static fromString(type: string): SlotType {
		try {
			return SlotType[type as keyof typeof SlotType]
		} catch(_) {
			throw AppError.entity("SlotType", "Invalid slot type")
		}
	}
}

export class Slot {
	constructor(
		public readonly id: number,
		public readonly modules: number,
		public readonly mode: SlotMode,
		public readonly slot1: SlotType,
		public readonly slot2: SlotType,
		public readonly slot3: SlotType,
		public readonly slot4: SlotType,
		public readonly selfPosition: number,
		public readonly casePosition: number,
		public readonly facePosition: number,
		public readonly discPosition: number,
	) {}

	static create(
		id: number,
		modules: number,
		mode: string,
		slot1: string,
		slot2: string,
		slot3: string,
		slot4: string,
		selfPosition: number,
		casePosition: number,
		facePosition: number,
		discPosition: number
	): Slot {
		return new Slot(
			id,
			modules,
			SlotModeMapping.fromString(mode),
			SlotTypeMapping.fromString(slot1),
			SlotTypeMapping.fromString(slot2),
			SlotTypeMapping.fromString(slot3),
			SlotTypeMapping.fromString(slot4),
			selfPosition,
			casePosition,
			facePosition,
			discPosition
		)
	}
}
