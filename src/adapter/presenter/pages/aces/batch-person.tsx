import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { BatchNav } from "@presenter/pages/aces/components/batch-nav";
import { BatchManagementHeader } from "@presenter/pages/aces/components/batch-management-header";
import { PersonUploader } from "@presenter/pages/aces/components/person-uploader";
import { route } from "@src/infra/singeleton/RouteCollection";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { PersonManagement } from "@presenter/pages/aces/components/person-management";

interface PageProps {
	batch: {
		uuid: string;
		token: string;
		title: string;
		regrouping: number;
		organization_uuid: string;
		organization_name: string;
	},
	persons: {
		batchId: string,
		name: string,
		nip: string,
		hash: string,
		email: string,
		gender: string,
		username: string,
		id?: string,
		batchGroupId?: number,
		organizationId?: string,
		plain?: string,
	}[]
}



function Page({ batch, persons }: PageProps) {
	return (
		<div className="mx-auto w-7xl px-2 px-8 pb-12">

			<BatchRoleNav />
			<BatchManagementHeader batch={ batch } />

			<hr className="border-gray-400 my-8" />
			<div
				hx-get={ route("get.aces.hx.batch.batch_id.batch_navbar", [batch.uuid]) }
				hx-trigger={`${HTMX_EVENTS.ACES_Regrouping} from:body`}
				hx-target="this"
				hx-swap="innerHTML"
			>
				<BatchNav batch={ batch } />
			</div>

			<div
				className="col-span-8"
				hx-get={ route("get.aces.hx.batch.batch_id.person_uploader", [batch.uuid]) }
				hx-trigger={ `${HTMX_EVENTS.ACES_BatchPersonMutation} from:body` }
				hx-target="this"
				hx-swap="innerHTML"
			>
				<PersonUploader
					batchId={ batch.uuid }
					shouldShow={ Boolean(!persons?.length) }
				/>
			</div>

			<div
				className="col-span-8"
				hx-get={ route("get.aces.hx.batch.batch_id.person_management", [batch.uuid]) }
				hx-trigger={ `${HTMX_EVENTS.ACES_BatchPersonMutation} from:body` }
				hx-target="this"
				hx-swap="innerHTML"
			>
				<PersonManagement
					batchId={ batch.uuid }
					persons={ persons }
				/>
			</div>
		</div>
	)
}

export const BatchBatchPersonPage = AcesTMLHOC(Page, {
	viteGenerated: ["aces-batch-person"],
});