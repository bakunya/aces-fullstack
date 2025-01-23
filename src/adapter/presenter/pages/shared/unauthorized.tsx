import { SharedHTMLHOC } from "@presenter/html/shared";

type TProps = {
	dashboardUrl: string,
}

function Page({ dashboardUrl }: TProps) {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className="flex flex-col gap-5 items-center">
				<h1 className="text-lg">401</h1>
				<h1>Unauthorized</h1>
				<div className="flex gap-5">
					<a href={ dashboardUrl }>Kembali ke Dashboard</a>
				</div>
			</div>
		</div>
	)
}

export const UnauthorizedPage = SharedHTMLHOC(Page);