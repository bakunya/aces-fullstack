import { AppError } from "@src/application/error/AppError";
import { CaseAnalysRepository, TCaseAnalysUpdateAssignment, TCaseAnalysUpdateQuestion } from "@src/application/repositories/CaseAnalysRepository";
import { CaseAnalysQuestionElement } from "@src/domain/CaseAnalysQuestionElement";
import { CaseAnalysQuestion } from "@src/domain/CaseAnalysQuestion";
import { TableModCaElement } from "@src/infra/databases/d1/dto/tables";

export class CaseAnalysRepositoryImpl implements CaseAnalysRepository {
	constructor(private db: D1Database) { }

	static create(db: D1Database): CaseAnalysRepository {
		return new CaseAnalysRepositoryImpl(db);
	}

	async initializeAllTable(moduleId: string, maxtime: number): Promise<void> {
		await this.db.batch([
			this.db.prepare("INSERT INTO mod_ca (mod_uuid, maxtime) VALUES (?,?)").bind(moduleId, maxtime),
		]);
	}

	async getCaseAnalysData(id: string): Promise<CaseAnalysQuestion[]> {
		const query = this.db.prepare(`
			SELECT  
				modules.uuid as mod_uuid,
				modules.title as mod_title,
				mod_ca.content as main_content,
				mod_ca_assignments.id as assignment_id,
				mod_ca_assignments.seq as assignment_seq,
				mod_ca_assignments.title as assignment_title,
				mod_ca_assignments.content as assignment_content,
				mod_ca_questions.id as question_id,
				mod_ca_questions.content as question_content,
				mod_ca_questions.seq as question_sequence
			FROM modules  
			LEFT JOIN mod_ca ON modules.uuid = mod_ca.mod_uuid
			LEFT JOIN mod_ca_assignments ON mod_ca.mod_uuid = mod_ca_assignments.mod_uuid
			LEFT JOIN mod_ca_questions ON mod_ca_assignments.id = mod_ca_questions.mod_ca_assignments_id
			WHERE modules.uuid = ?
			ORDER BY mod_ca_assignments.id ASC, question_sequence ASC
	  `).bind(id);

		const result = (await query.all()).results as unknown as ({
			mod_uuid: string,
			mod_title: string,
			main_content: string,
			assignment_id: string,
			assignment_title: string,
			assignment_content: string,
			question_id: string,
			question_content: string,
			question_sequence: number,
			assignment_seq: number,
		})[];

		return result.map(row => CaseAnalysQuestion.create(
			row.mod_uuid,
			row.mod_title,
			row.main_content,
			row.assignment_id,
			row.assignment_title,
			row.assignment_content,
			row.question_id,
			row.question_content,
			row.question_sequence,
			row.assignment_seq,
		));
	}

	async getUsedElements(questionIds: string[]): Promise<CaseAnalysQuestionElement[]> {
		if (questionIds.length === 0) return [];
		const placeholders = questionIds.map(() => "?").join(",");
		const query = this.db.prepare(`SELECT * FROM mod_ca_question_elements WHERE id_mod_ca_question IN (${placeholders})`).bind(...questionIds);
		const result = (await query.all()).results as unknown as TableModCaElement[];
		
		return result.map(row => CaseAnalysQuestionElement.create(
			row.id,
			row.id_element,
			row.id_mod_ca_question,
		));
	}

	async saveMainContent(moduleId: string, mainContent: string): Promise<void> {
		// checking if exists
		const isExists = await this.db.prepare(`SELECT COUNT(*) as total FROM mod_ca WHERE mod_uuid = ?`).bind(moduleId).first() as { total: number }
		if (!isExists.total) {
			const query = this.db.prepare(`INSERT INTO mod_ca (mod_uuid, content) VALUES (?, ?)`).bind(moduleId, mainContent);
			await query.run()
			return
		} else {
			const query = this.db.prepare(`UPDATE mod_ca SET content = ? WHERE mod_uuid = ?`).bind(mainContent, moduleId);
			await query.run()
		}
	}

	async getMainContent(moduleId: string): Promise<string> {
		const query = this.db.prepare(`SELECT content FROM mod_ca WHERE mod_uuid = ?`).bind(moduleId);
		const result = (await query.first()) as unknown as { content: string };

		return result?.content ?? "";
	}

	async newAssignment(moduleId: string): Promise<void> {
		const content = (await this.db.prepare(`SELECT mod_uuid FROM mod_ca WHERE mod_uuid = ?`)
			.bind(moduleId).first() as { id: string })
		if (!content) throw AppError.database(`Content not found for module ${moduleId}`, `Content not found`)
		const sequence = await this.db.prepare(`SELECT COALESCE(MAX(seq), 0) + 1 as seq FROM mod_ca_assignments WHERE mod_uuid = ?`)
			.bind(moduleId).first() as { seq: number };
		const query = this.db.prepare(`INSERT INTO mod_ca_assignments (mod_uuid, seq) VALUES (?, ?)`).bind(moduleId, sequence.seq);
		await query.run()
	}

	async updateAssignment(data: TCaseAnalysUpdateAssignment): Promise<void> {
		await this.db.prepare(`
			UPDATE mod_ca_assignments 
			SET title = ?, content = ?, seq = COALESCE(?, seq)
			WHERE mod_uuid = ? AND id = ?
		`)
			.bind(data.assignmentTitle, data.assignmentContent, data.assignmentSequence, data.moduleId, data.assignmentId)
			.run()
	}

	async newQuestion(moduleId: string, assignmentId: string): Promise<void> {
		const query = this.db.prepare(`
			INSERT INTO mod_ca_questions (mod_uuid, mod_ca_assignments_id, seq)
			VALUES (?, ?, COALESCE((SELECT MAX(seq) + 1 FROM mod_ca_questions WHERE mod_ca_assignments_id = ?), 1))
		`).bind(moduleId, assignmentId, assignmentId);
		await query.run()
	}

	async updateQuestion(data: TCaseAnalysUpdateQuestion): Promise<void> {
		const {
			questionId,
			questionContent,
			questionSequence,
			questionElements
		} = data;

		await this.db.batch([
			this.db.prepare(`UPDATE mod_ca_questions SET content = ?, seq = ? WHERE id = ?`).bind(questionContent, questionSequence, questionId),
			this.db.prepare(`DELETE FROM mod_ca_question_elements WHERE id_mod_ca_question = ?`).bind(questionId),
			...questionElements.map(v => this.db
				.prepare(`INSERT INTO mod_ca_question_elements (id_element, id_mod_ca_question) VALUES (?, ?)`)
				.bind(v.value, questionId)
			)
		]);
	}
}