import { SharedHTMLHOC } from "@presenter/html/shared";

type Props = {
	error?: string
}

function Page({ error }: Props) {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-md mx-auto px-4 pt-32">
				<div className="bg-white shadow-md rounded-lg p-8">
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login User</h2>
					<form action="" method="post" className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								value={"allaccess@aces.com"}
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								value={"allaccess"}
							/>
						</div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign In
						</button>
					</form>
					{ error && <p className="mt-4 text-sm text-center text-red-600">{ error }</p> }
				</div>
			</div>
			{ error && <p className="text-red-500">Invalid username or password</p> }
		</div>
	)
}

export const SharedAuthPage = SharedHTMLHOC(Page);