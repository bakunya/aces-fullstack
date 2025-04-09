import { IntrayIntroDev, TIntrayIntroDevProps } from "@presenter/components/intray-intro-dev";
import { IntrayOutroDev, TIntrayOutroDevProps } from "@presenter/components/intray-outro-dev";
import { IntrayTask1, TIntrayTask1Props } from "@presenter/components/intray-task-1-dev";
import { IntrayTask2, TIntrayTask2Props } from "@presenter/components/intray-task-2-dev";
import { IntrayTask3, TIntrayTask3Props } from "@presenter/components/intray-task-3-dev";
import { IntrayTask4, TIntrayTask4Props } from "@presenter/components/intray-task-4-dev";
import { IntrayTask5, TIntrayTask5Props } from "@presenter/components/intray-task-5-dev";
import { ModuleHTMLHOC } from "@presenter/html/module";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { IntrayTableString } from "@src/application/repositories/IntrayRepository";
import { route } from "@src/infra/singeleton/RouteCollection";
import { match } from "ts-pattern";

type TProps = {
	paths: {
		path: string,
		name: string
	}[],
	module: {
		uuid: string,
		title: string,
	},
	intray: unknown,
	sectionType: IntrayTableString
}

const Page = ({ paths, module, sectionType, intray }: TProps) => {
	return (
		<div className="p-5">
			<div className="max-w-4xl mx-auto px-6">
				<div className="flex flex-col mt-5 mb-8">
					<span className="text-sm font-semibold text-gray-500">Intray</span>
					<h1 className="font-bold text-xl capitalize">Judul: { module.title }</h1>
				</div>
				<hr />
				<div className="flex justify-between mt-5">
					<a href="#" className="capitalize btn btn-neutral btn-sm font-semibold">
						Persoalan
					</a>
					<div className="flex gap-2">
						{ paths.map(({ name, path }, idx) => (
							<a
								key={ idx }
								href={ route("get.module.dashboard.intray.id.dev.section.section_type", [module.uuid, path]) }
								className="capitalize btn btn-neutral btn-sm font-semibold"
							>
								{ name }
							</a>
						)) }
					</div>
				</div>
				<div
					hx-target="this"
					hx-swap="innerHTML"
					hx-trigger={`${HTMX_EVENTS.MODULE_GetIntraySection} from:body`}
					hx-get={route("get.module.hx.dashboard.intray.id.dev.section.section_type", [module.uuid, sectionType.replaceAll("mod_", "")])}
				>
					{ match(sectionType)
						// @ts-ignore
						.with("mod_intray_intro", () => <IntrayIntroDev data={ intray as TIntrayIntroDevProps } />)
						// @ts-ignore
						.with("mod_intray_outro", () => <IntrayOutroDev data={ intray as TIntrayOutroDevProps } />)
						// @ts-ignore
						.with("mod_intray_task_1", () => <IntrayTask1 data={ intray as TIntrayTask1Props } />)
						// @ts-ignore
						.with("mod_intray_task_2", () => <IntrayTask2 data={ intray as TIntrayTask2Props } />)
						// @ts-ignore
						.with("mod_intray_task_3", () => <IntrayTask3 data={ intray as TIntrayTask3Props } />)
						// @ts-ignore
						.with("mod_intray_task_4", () => <IntrayTask4 data={ intray as TIntrayTask4Props } />)
						// @ts-ignore
						.with("mod_intray_task_5", () => <IntrayTask5 data={ intray as TIntrayTask5Props } />)
						// @ts-ignore
						.otherwise(() => "") }
				</div>
			</div>
		</div>
	)
}

export const ModuleIntrayDevPage = ModuleHTMLHOC(Page, { viteGenerated: ["intray-dev"] });