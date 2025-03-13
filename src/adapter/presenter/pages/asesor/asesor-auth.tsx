import { AsesorHTMLHOC } from "@presenter/html/asesor";

type Props = {
	error?: string
}

export function Page({ error }: Props) {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-md mx-auto px-4 pt-32">
				<div className="bg-white shadow-md rounded-lg p-8">
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login Asesor</h2>
					<form action="" method="post" className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
			<h1 className="text-lg">Seed Data</h1>
			<table class="table-auto border-collapse border border-gray-300 w-full bg-white rounded-lg shadow-lg">
				<thead class="bg-gray-100">
					<tr>
						<th class="border border-gray-300 px-4 py-2 text-left">Username</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Password</th>
					</tr>
				</thead>
				<tbody>
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2">allaccess@aces.com</td>
						<td class="border border-gray-300 px-4 py-2">allaccess</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export const AsesorAuthPage = AsesorHTMLHOC(Page);