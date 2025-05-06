import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { BatchManagementHeader } from "@presenter/pages/aces/components/batch-management-header";
import { route } from "@src/infra/singeleton/RouteCollection";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { BatchNav } from "@presenter/pages/aces/components/batch-nav";
import { BatchTimeDeployment } from "@presenter/pages/aces/components/batch-time-deployment";

interface PageProps {
	batch: {
		uuid: string;
		token: string;
		title: string;
		regrouping: number;
		type: string;
		organization_uuid: string;
		organization_name: string;
		time1_start_date?: string,
		time1_start_time?: string,
		time2_start_date?: string,
		time2_start_time?: string,
		time3_start_date?: string,
		time3_start_time?: string,
		time4_start_date?: string,
		time4_start_time?: string,
		time1_end_date?: string,
		time1_end_time?: string,
		time2_end_date?: string,
		time2_end_time?: string,
		time3_end_date?: string,
		time3_end_time?: string,
		time4_end_date?: string,
		time4_end_time?: string,
		batch_time_end_date?: string,
		batch_time_end_time?: string,
		batch_time_start_date?: string,
		batch_time_start_time?: string,
	},
	filledSlot: {
		slot_1: boolean,
		slot_2: boolean,
		slot_3: boolean,
		slot_4: boolean,
	}
}


function Page({ batch, filledSlot }: PageProps) {
	return (
		<div className="mx-auto w-7xl px-2 px-8 pb-12">

			<BatchRoleNav />
			<BatchManagementHeader batch={ batch } />
			<hr className="border-gray-400 my-8" />
			<div
				hx-get={ route("get.aces.hx.batch.batch_id.batch_navbar", [batch.uuid]) }
				hx-trigger={ `${HTMX_EVENTS.ACES_Regrouping} from:body` }
				hx-target="this"
				hx-swap="innerHTML"
			>
				<BatchNav batch={ batch } />
			</div>



			<div role="alert" class="alert alert-info alert-outline mt-10 rounded">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				<span>Semua waktu didasarkan pada UTC+7 (Asia/Jakarta)</span>
			</div>

			<div className="grid grid-cols-12 mt-10">
				<div className="p-5 border col-span-7 rounded border-gray-400 flex flex-col gap-5">
					<p className="font-semibold">Pengaturan Waktu Batch</p>
					<hr className="border-gray-400 mb-3" />
					<div
						hx-get={ route("get.aces.hx.batch.batch_id.deployment.time.time_type", [batch.uuid, "batch_time"]) }
						hx-swap="innerHTML"
						hx-trigger={ `${HTMX_EVENTS.ACES_DeploymentBatchTime} from:body` }
					>
						<BatchTimeDeployment
							timeType="batch_time"
							batchId={ batch.uuid }
							type={ batch.type }
							time_start_date={ batch.batch_time_start_date }
							time_start_time={ batch.type === "ascent" && !batch.batch_time_start_time ? "08:00" : batch.batch_time_start_time }
							time_end_date={ batch.batch_time_end_date }
							time_end_time={ batch.type === "ascent" && !batch.batch_time_end_time ? "17:00" : batch.batch_time_end_time }
						/>
					</div>
				</div>
			</div>

			{ filledSlot.slot_1 && (
				<div className="grid grid-cols-12 mt-10">
					<div className="p-5 border col-span-7 rounded border-gray-400 flex flex-col gap-5">
						<p className="font-semibold">Pengaturan Sesi Pertama</p>
						<hr className="border-gray-400 mb-3" />
						<div
							hx-swap="innerHTML"
							hx-get={ route("get.aces.hx.batch.batch_id.deployment.time.time_type", [batch.uuid, "time1"]) }
							hx-trigger={ `${HTMX_EVENTS.ACES_DeploymentTime1} from:body, ${HTMX_EVENTS.ACES_DeploymentBatchTime} from:body` }
						>
							<BatchTimeDeployment
								timeType="time1"
								batchId={ batch.uuid }
								type={ batch.type }
								time_start_date={ batch.time1_start_date }
								time_start_time={ batch.time1_start_time }
								time_end_date={ batch.time1_end_date }
								time_end_time={ batch.time1_end_time }
							/>
						</div>
					</div>
				</div>
			) }


			{ filledSlot.slot_2 && (
				<div className="grid grid-cols-12 mt-10">
					<div className="p-5 border col-span-7 rounded border-gray-400 flex flex-col gap-5">
						<p className="font-semibold">Pengaturan Sesi Kedua</p>
						<hr className="border-gray-400 mb-3" />
						<div
							hx-swap="innerHTML"
							hx-get={ route("get.aces.hx.batch.batch_id.deployment.time.time_type", [batch.uuid, "time2"]) }
							hx-trigger={ `${HTMX_EVENTS.ACES_DeploymentTime2} from:body, ${HTMX_EVENTS.ACES_DeploymentBatchTime} from:body` }
						>
							<BatchTimeDeployment
								timeType="time2"
								batchId={ batch.uuid }
								type={ batch.type }
								time_start_date={ batch.time2_start_date }
								time_start_time={ batch.time2_start_time }
								time_end_date={ batch.time2_end_date }
								time_end_time={ batch.time2_end_time }
							/>
						</div>
					</div>
				</div>
			) }

			{ filledSlot.slot_3 && (
				<div className="grid grid-cols-12 mt-10">
					<div className="p-5 border col-span-7 rounded border-gray-400 flex flex-col gap-5">
						<p className="font-semibold">Pengaturan Sesi Ketiga</p>
						<hr className="border-gray-400 mb-3" />
						<div
							hx-swap="innerHTML"
							hx-get={ route("get.aces.hx.batch.batch_id.deployment.time.time_type", [batch.uuid, "time3"]) }
							hx-trigger={ `${HTMX_EVENTS.ACES_DeploymentTime3} from:body, ${HTMX_EVENTS.ACES_DeploymentBatchTime} from:body` }
						>
							<BatchTimeDeployment
								timeType="time3"
								batchId={ batch.uuid }
								type={ batch.type }
								time_start_date={ batch.time3_start_date }
								time_start_time={ batch.time3_start_time }
								time_end_date={ batch.time3_end_date }
								time_end_time={ batch.time3_end_time }
							/>
						</div>
					</div>
				</div>
			) }


			{ filledSlot.slot_4 && (
				<div className="grid grid-cols-12 mt-10">
					<div className="p-5 border col-span-7 rounded border-gray-400 flex flex-col gap-5">
						<p className="font-semibold">Pengaturan Sesi Keempat</p>
						<hr className="border-gray-400 mb-3" />
						<div
							hx-swap="innerHTML"
							hx-get={ route("get.aces.hx.batch.batch_id.deployment.time.time_type", [batch.uuid, "time4"]) }
							hx-trigger={ `${HTMX_EVENTS.ACES_DeploymentTime4} from:body, ${HTMX_EVENTS.ACES_DeploymentBatchTime} from:body` }
						>
							<BatchTimeDeployment
								timeType="time4"
								batchId={ batch.uuid }
								type={ batch.type }
								time_start_date={ batch.time4_start_date }
								time_start_time={ batch.time4_start_time }
								time_end_date={ batch.time4_end_date }
								time_end_time={ batch.time4_end_time }
							/>
						</div>
					</div>
				</div>
			) }


		</div>
	)
}

export const BatchDeploymentPage = AcesTMLHOC(Page, {
	viteGenerated: ["aces-batch-deployment"]
});