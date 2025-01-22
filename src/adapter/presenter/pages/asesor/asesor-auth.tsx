import { AsesorHTMLHOC } from "@presenter/html/asesor";

type Props = {
	error?: string
}

export function Page({ error }: Props) {
	return (
		<div className="p-5">
			<h1 className="mb-5">asesor</h1>
			<form action="" method="post" className="flex gap-5">
				<input type="text" className="border border-black" placeholder="username" name="username" />
				<input type="password" className="border border-black" placeholder="password" name="password" />
				<button type="submit">Login</button>
			</form>
			{  error && <p className="text-red-500">Invalid username or password</p> }
			<h1 className="text-lg">Seed Data</h1>
			<table class="table-auto border-collapse border border-gray-300 w-full bg-white rounded-lg shadow-lg">
				<thead class="bg-gray-100">
					<tr>
						<th class="border border-gray-300 px-4 py-2 text-left">ID</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Username</th>
						<th class="border border-gray-300 px-4 py-2 text-left">Password</th>
					</tr>
				</thead>
				<tbody>
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2">1</td>
						<td class="border border-gray-300 px-4 py-2">user 1</td>
						<td class="border border-gray-300 px-4 py-2">password</td>
					</tr>
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2">2</td>
						<td class="border border-gray-300 px-4 py-2">user 2</td>
						<td class="border border-gray-300 px-4 py-2">password</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export const AsesorAuthPage = AsesorHTMLHOC(Page);