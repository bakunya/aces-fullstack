import { AsesorHTMLHOC } from "@presenter/html/asesor";
import { Batch } from "@src/domain/Batch";

type Props = {
	batch: Batch[]
}

function Page(data: Props) {
	return (
		<div className={"p-5"}>
			<h1>Dashboard Asesor</h1>
			<br />
			<form action="/logout" method="post">
				<button type="submit">Logout</button>
			</form>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}

export const AsesorDashboardPage = AsesorHTMLHOC(Page);