import { IntrayRepository, IntrayTable, UpdateIntroDev, UpdateOutroDev, UpdateTask1, UpdateTask2, UpdateTask3, UpdateTask4, UpdateTask5 } from "@src/application/repositories/IntrayRepository";

export class IntraySectionUpdateUsecase {
	constructor(private readonly repo: IntrayRepository) { }

	static create(repo: IntrayRepository) {
		return new IntraySectionUpdateUsecase(repo)
	}

	async execute(data: Record<any, any>, section: IntrayTable) {
		switch (section) {
			case IntrayTable.mod_intray_intro:
				return (await this.repo.updateIntrayIntro(data as UpdateIntroDev))
			case IntrayTable.mod_intray_outro:
				return (await this.repo.updateIntrayOutro(data as UpdateOutroDev))
			case IntrayTable.mod_intray_task_1:
				return (await this.repo.updateIntrayTask1(data as UpdateTask1))
			case IntrayTable.mod_intray_task_2:
				return (await this.repo.updateIntrayTask2(data as UpdateTask2))
			case IntrayTable.mod_intray_task_3:
				return (await this.repo.updateIntrayTask3(data as UpdateTask3))
			case IntrayTable.mod_intray_task_4:
				return (await this.repo.updateIntrayTask4(data as UpdateTask4))
			case IntrayTable.mod_intray_task_5:
				return (await this.repo.updateIntrayTask5(data as UpdateTask5))
		}
	}
}