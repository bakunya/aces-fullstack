import { SharedHTMLHOC } from "@presenter/html/shared";

function Page() {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className="flex flex-col">
				<h1 className="text-4xl mb-2">Landing Page</h1>
				<div className="flex flex-col gap-5 mt-9">
					<a href="/login" className="p-4 bg-blue-400">Login asesi</a>
					<a href="/auth/login" className="p-4 bg-blue-400">Login user</a>
				</div>
			</div>
		</div>
	)
}

export const LandingPage = SharedHTMLHOC(Page);