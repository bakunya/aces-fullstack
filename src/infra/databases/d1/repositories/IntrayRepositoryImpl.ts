import { IntrayRepository, IntrayTableString, UpdateIntroDev, UpdateOutroDev, UpdateTask1, UpdateTask2, UpdateTask3, UpdateTask4, UpdateTask5 } from "@src/application/repositories/IntrayRepository";

export class IntrayRepositoryImpl implements IntrayRepository {
	constructor(private readonly db: D1Database) { }

	static create(db: D1Database): IntrayRepositoryImpl {
		return new IntrayRepositoryImpl(db);
	}

	async initializeAllTable(moduleId: string, maxtime: number): Promise<void> {
		await this.db.batch([
			this.db.prepare("INSERT INTO mod_intray_intro (mod_uuid) VALUES (?)").bind(moduleId),
			this.db.prepare("INSERT INTO mod_intray_outro (mod_uuid) VALUES (?)").bind(moduleId),
			this.db.prepare("INSERT INTO mod_intray (mod_uuid, maxtime) VALUES (?, ?)").bind(moduleId, maxtime),
			this.db.prepare("INSERT INTO mod_intray_task_1 (mod_uuid, time_in_seconds) VALUES (?, ?)").bind(moduleId, 3600),
			this.db.prepare("INSERT INTO mod_intray_task_2 (mod_uuid, time_in_seconds) VALUES (?, ?)").bind(moduleId, 1800),
			this.db.prepare("INSERT INTO mod_intray_task_3 (mod_uuid, time_in_seconds) VALUES (?, ?)").bind(moduleId, 900),
			this.db.prepare("INSERT INTO mod_intray_task_4 (mod_uuid, time_in_seconds) VALUES (?, ?)").bind(moduleId, 900),
			this.db.prepare("INSERT INTO mod_intray_task_5 (mod_uuid, time_in_seconds) VALUES (?, ?)").bind(moduleId, 1800)
		]);
	}

	async getSection(moduleId: string, section: IntrayTableString): Promise<unknown> {
		const row = (await this.db.prepare(`SELECT * FROM ${section} WHERE mod_uuid = ?`).bind(moduleId).first()) as unknown;
		return row;
	}

	async updateIntrayIntro(data: UpdateIntroDev): Promise<void> {
		const { id, title, content } = data;

		const query = `
			UPDATE mod_intray_intro
			SET 
				title = ?,
				content = ?,
				updated = datetime('now') || 'Z'
			WHERE id = ?
		`;
	
		await this.db.prepare(query).bind(title, content, id).run();
	}

	async updateIntrayOutro(data: UpdateOutroDev): Promise<void> {
		const { id, title, content } = data;

		const query = `
			UPDATE mod_intray_outro
			SET 
				title = ?,
				content = ?,
				updated = datetime('now') || 'Z'
			WHERE id = ?
		`;

		await this.db.prepare(query).bind(title, content, id).run();
	}

	async updateIntrayTask1(data: UpdateTask1): Promise<void> {
		const { id, title, label_1, label_2, label_3, content } = data;

		const query = `
			UPDATE mod_intray_task_1
			SET 
				title = ?,
				label_1 = ?,
				label_2 = ?,
				label_3 = ?,
				content = ?,
				updated = datetime('now') || 'Z'
			WHERE id = ?
		`;
	
		await this.db.prepare(query).bind(title, label_1, label_2, label_3, content, id).run();
	}

	async updateIntrayTask2(data: UpdateTask2): Promise<void> {
		const { id, title, label_1, label_2, label_3, label_4, content } = data;

		const query = `
			UPDATE mod_intray_task_2
			SET 
				title = ?,
				label_1 = ?,
				label_2 = ?,
				label_3 = ?,
				label_4 = ?,
				content = ?,
				updated = datetime('now') || 'Z'
			WHERE id = ?
		`;
	
		await this.db.prepare(query).bind(title, label_1, label_2, label_3, label_4, content, id).run();
	}

	async updateIntrayTask3(data: UpdateTask3): Promise<void> {
		const { id, title, label_1, label_2, label_3, content } = data;

		const query = `
			UPDATE mod_intray_task_3
			SET 
				title = ?,
				label_1 = ?,
				label_2 = ?,
				label_3 = ?,
				content = ?,
				updated = datetime('now') || 'Z'
			WHERE id = ?
		`;
	
		await this.db.prepare(query).bind(title, label_1, label_2, label_3, content, id).run();
	}

	async updateIntrayTask4(data: UpdateTask4): Promise<void> {
		const { id, title, label_1, label_2, label_3, label_4, content } = data;

		const query = `
			UPDATE mod_intray_task_4
			SET 
				title = ?,
				label_1 = ?,
				label_2 = ?,
				label_3 = ?,
				label_4 = ?,
				content = ?,
				updated = datetime('now') || 'Z'
			WHERE id = ?
		`;
	
		await this.db.prepare(query).bind(title, label_1, label_2, label_3, label_4, content, id).run();
	}

	async updateIntrayTask5(data: UpdateTask5): Promise<void> {
		const { id, title, label_1, content } = data;

		const query = `
			UPDATE mod_intray_task_5
			SET 
				title = ?,
				label_1 = ?,
				content = ?,
				updated = datetime('now') || 'Z'
			WHERE id = ?
		`;
	
		await this.db.prepare(query).bind(title, label_1, content, id).run();
	}
}
