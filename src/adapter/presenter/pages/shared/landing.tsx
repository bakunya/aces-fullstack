import { SharedHTMLHOC } from "@presenter/html/shared";

function Page() {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className="flex flex-col">
				<h1 className="text-4xl mb-2">Landing Page</h1>
				<div className="flex flex-col gap-5 mt-9">
					<a href="/login" className="p-4 bg-blue-400">Login asesi</a>
					<a href="/asesor/login" className="p-4 bg-blue-400">Login asesor</a>
					<a href="/admin/login" className="p-4 bg-blue-400">Login admin</a>
					<a href="/developer/login" className="p-4 bg-blue-400">Login developer</a>
				</div>
			</div>
		</div>
	)
}

export const LandingPage = SharedHTMLHOC(Page);