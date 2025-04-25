import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { BatchNav } from "@presenter/pages/aces/components/batch-nav";
import { route } from "@src/infra/singeleton/RouteCollection";
import { BatchModuleTable } from "@presenter/pages/aces/components/batch-module-table";
import { FormAddBatchModule } from "@presenter/pages/aces/components/form-add-batch-module";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { BatchManagementHeader } from "@presenter/pages/aces/components/batch-management-header";

interface PageProps {
	batch: {
		uuid: string;
		token: string;
		title: string;
		regrouping: number;
		organization_uuid: string;
		organization_name: string;
	},
	availableModules: Map<string, {
		uuid: string
		type: string
		title: string
		description: string
		category: string
		status: number
	}[]>,
	batchInModules: Map<string, {
		batch_uuid: string;
		module_uuid: string;
		uuid: string;
		created: string;
		priority: number;
		updated?: string;
		module?: {
			type: string;
			title: string;
			category: string;
		};
	}[]>,
}



function Page({ batch, availableModules, batchInModules }: PageProps) {
	const availableModulesObject = Object.fromEntries(availableModules.entries())
	const batchInModulesObject = Object.fromEntries(batchInModules.entries())
	
	return (
		<div className="mx-auto w-7xl px-2 px-8">

			<BatchRoleNav />
			<BatchManagementHeader batch={batch} />


			<hr className="border-gray-400 my-8" />
			<div
				hx-get={ route("get.aces.hx.batch.batch_id.batch_navbar", [batch.uuid]) }
				hx-trigger={`${HTMX_EVENTS.ACES_Regrouping} from:body`}
				hx-target="this"
				hx-swap="innerHTML"
			>
				<BatchNav batch={ batch } />
			</div>

			<div className="mt-8 grid grid-cols-12 gap-5">
				<div className="col-span-8">
					<div
						hx-get={ route("get.aces.hx.batch.batch_id.batch_module_table", [batch.uuid]) }
						hx-trigger={`${HTMX_EVENTS.ACES_BatchModuleMutation} from:body`}
						hx-target="this"
						hx-swap="innerHTML"
					>
						<BatchModuleTable modules={ Object.values(batchInModulesObject).flat(2) } />
					</div>
				</div>
				<div className="col-span-4">
					<div
						hx-get={ route("get.aces.hx.batch.batch_id.form_add_batch_module", [batch.uuid]) }
						hx-trigger={`${HTMX_EVENTS.ACES_BatchModuleMutation} from:body`}
						hx-target="this"
						hx-swap="innerHTML"

					>
						<FormAddBatchModule 
							batchId={ batch.uuid }
							availableModulesObject={ availableModulesObject }
							batchInModulesObject={ batchInModulesObject }
							shouldShow={ Object.values(batchInModulesObject).flat(2).length < 4 }
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export const BatchBatchDetailPage = AcesTMLHOC(Page, {
	viteGenerated: ["aces-batch-detail"]
});