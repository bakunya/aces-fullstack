import { AdminHTMLHOC } from "@presenter/html/admin";

function Page() {
	return (
		<>
			<h1 className="p-5">Dashboard Admin</h1>
			<br />
			<form action="/logout" method="post">
				<button type="submit">Logout</button>
			</form>
		</>
	)
}

export const AdminDashboardPage = AdminHTMLHOC(Page, {
	viteGenerated: ["admin"]
});