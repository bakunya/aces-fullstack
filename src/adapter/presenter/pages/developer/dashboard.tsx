import { DeveloperHTMLHOC } from "@presenter/html/developer";

function Page() {
	return (
		<>
			<h1 className="p-5">Developer Admin</h1>
			<br />
			<form action="/logout" method="post">
				<button type="submit">Logout</button>
			</form>
		</>
	)
}

export const DeveloperDashboardPage = DeveloperHTMLHOC(Page);