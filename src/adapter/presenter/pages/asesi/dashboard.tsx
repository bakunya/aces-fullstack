import { AsesiHTMLHOC } from "@presenter/html/asesi";
import { Batch } from "@src/domain/Batch";
import { BatchModule } from "@src/domain/BatchModule";

type Props = {
	batch: Batch,
	modules: BatchModule[]
}

function Page(data: Props) {
	return (
		<div className="p-5">
			<h1>Asesi Admin</h1>
			<br />
			<form action="/logout" method="post">
				<button type="submit">Logout</button>
			</form>
			<pre>{ JSON.stringify(data, null, 2) }</pre>
		</div>
	)
}

export const AsesiDashboardPage = AsesiHTMLHOC(Page, { viteGenerated: ["asesi"] });