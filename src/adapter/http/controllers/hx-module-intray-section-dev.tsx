import { IntrayTask1, TIntrayTask1Props } from "@presenter/components/intray-task-1-dev";
import { IntrayTask2, TIntrayTask2Props } from "@presenter/components/intray-task-2-dev";
import { IntrayTask3, TIntrayTask3Props } from "@presenter/components/intray-task-3-dev";
import { IntrayTask4, TIntrayTask4Props } from "@presenter/components/intray-task-4-dev";
import { IntrayTask5, TIntrayTask5Props } from "@presenter/components/intray-task-5-dev";
import { IntrayIntroDev, TIntrayIntroDevProps } from "@presenter/components/intray-intro-dev";
import { IntrayOutroDev, TIntrayOutroDevProps } from "@presenter/components/intray-outro-dev";
import { Context } from "@src/adapter/http/contracts/binding";
import { IntrayDevUrlParam } from "@src/adapter/http/contracts/request/intray-dev";
import { IntrayDevSectionUrlParam } from "@src/adapter/http/contracts/request/intray-dev-section";
import { IntrayTableMapping, IntrayTableString } from "@src/application/repositories/IntrayRepository";
import { IntrayRepositoryImpl } from "@src/infra/databases/d1/repositories/IntrayRepositoryImpl";
import { match } from "ts-pattern";

export async function hxModuleIntraySectionDevController(c: Context) {
	const modId = c.req.param(IntrayDevUrlParam.id)

	const intrayRepo = IntrayRepositoryImpl.create(c.env.DB)
	const sectionType = IntrayTableMapping.getKeyFromString(`mod_${c.req.param(IntrayDevSectionUrlParam.sectionType)}`) as IntrayTableString
	const data = await intrayRepo.getSection(modId, sectionType)

	const html = match(sectionType)
		// @ts-ignore
		.with("mod_intray_intro", () => <IntrayIntroDev data={ data as TIntrayIntroDevProps } />)
		// @ts-ignore
		.with("mod_intray_outro", () => <IntrayOutroDev data={ data as TIntrayOutroDevProps } />)
		// @ts-ignore
		.with("mod_intray_task_1", () => <IntrayTask1 data={ data as TIntrayTask1Props } />)
		// @ts-ignore
		.with("mod_intray_task_2", () => <IntrayTask2 data={ data as TIntrayTask2Props } />)
		// @ts-ignore
		.with("mod_intray_task_3", () => <IntrayTask3 data={ data as TIntrayTask3Props } />)
		// @ts-ignore
		.with("mod_intray_task_4", () => <IntrayTask4 data={ data as TIntrayTask4Props } />)
		// @ts-ignore
		.with("mod_intray_task_5", () => <IntrayTask5 data={ data as TIntrayTask5Props } />)
		// @ts-ignore
		.exhaustive()
	return c.html(html)
}