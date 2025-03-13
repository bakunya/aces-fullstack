import { AsesiHTMLHOC } from "@presenter/html/asesi";
import { route } from "@src/infra/singeleton/RouteCollection";

type Props = {
	error?: string
}

export function Page({ error }: Props) {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center mb-8">Kode Assessment</h1>
				<form action={route("post.onboard")} method="post" className="flex flex-col items-center gap-6">
					<input 
						type="text"
						inputMode="numeric"
						className="text-center text-2xl tracking-widest w-48 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
						required
						minLength={4}
						maxLength={4}
						pattern="\d{4}"
						placeholder="• • • •"
						name="code"
					/>
					<button 
						type="submit"
						className="w-full max-w-[200px] bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
					>
						Verify
					</button>
				</form>
				{error && <p className="mt-4 text-center text-red-500">{error}</p>}
			</div>
		</div>
	)
}

export const AsesiOnboardingPage = AsesiHTMLHOC(Page);