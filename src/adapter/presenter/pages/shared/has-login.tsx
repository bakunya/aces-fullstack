import { SharedHTMLHOC } from "@presenter/html/shared";

type TProps = {
	userType: string,
	dashboardUrl: string,
}

function Page({ userType, dashboardUrl }: TProps) {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className="flex flex-col gap-5 items-center">
				<h1>Has Login: { userType }</h1>
				<div className="flex gap-5">
					<form action="/logout" method="post">
						<button type="submit">Logout</button>
					</form>
					<a href={dashboardUrl}>Dashboard</a>
				</div>
			</div>
		</div>
	)
}

export const HasLoginPage = SharedHTMLHOC(Page);