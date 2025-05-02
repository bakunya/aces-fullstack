import { route } from "@src/infra/singeleton/RouteCollection";

type Props = {
	time_start_date?: string;
	time_start_time?: string;
	time_end_date?: string;
	time_end_time?: string;
	batchId: string;
	timeType: "batch_time" | "time1" | "time2" | "time3" | "time4";
}

export function BatchTimeDeployment({ batchId, timeType, time_end_date, time_end_time, time_start_date, time_start_time }: Props) {
	return (
		<form
			hx-swap="none"
			className="flex flex-col gap-5"
			hx-put={ route("put.aces.hx.batch.batch_id.deployment.time.time_type", [batchId, timeType]) }
			x-data="{ editable: false }"
		>
			<div className="flex items-center justify-between">
				<p class="text-sm">Tanggal Mulai</p>
				<div className="flex items-center gap-3">
					<input x-bind:disabled="!editable" value={ time_start_date } required name="time_start_date" type="date" class="input w-[200px]" />
					<input x-bind:disabled="!editable" value={ time_start_time } required name="time_start_time" type="time" class="input w-[150px]" />
				</div>
			</div>
			<div className="flex items-center justify-between mb-3">
				<p class="text-sm">Tanggal Berakhir</p>
				<div className="flex items-center gap-3">
					<input x-bind:disabled="!editable" value={ time_end_date } required name="time_end_date" type="date" class="input w-[200px]" />
					<input x-bind:disabled="!editable" value={ time_end_time } required name="time_end_time" type="time" class="input w-[150px]" />
				</div>
			</div>
			<div x-show="editable" className="flex justify-between w-full gap-2">
				<button x-on:click="editable = false" type="button" className="btn w-[50%]">Cancel</button>
				<button className="btn w-[50%] btn-neutral">Save</button>
			</div>
			<button x-show="!editable" x-on:click="editable = true" type="button" className="btn btn-secondary">Edit</button>
		</form>
	)
}