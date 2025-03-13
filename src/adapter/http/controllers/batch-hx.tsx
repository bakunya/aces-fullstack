import { Context } from "@src/adapter/http/contracts/binding"
import { HxHeaderError } from "@src/adapter/http/contracts/response/hx-header-error"
import { route } from "@src/infra/singeleton/RouteCollection"

export async function batchHxController(c: Context) {
	const res = await c.req.parseBody() as any
	const header = { requestError: "this is header custom server" } as HxHeaderError

	c.res.headers.set("HX-Trigger", JSON.stringify(header))
	return c.html(
		<form hx-post={route("post.batch.hx.test")} hx-target="this" hx-swap="outerHTML" class="max-w-[500px] space-y-4">
			<div>
				<label class="block text-gray-600 text-sm">Name</label>
				<input value={`FROM SERVER = ${res.name}`} type="text" name="name" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
			</div>
			<button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
				Submit
			</button>
		</form>
	)
}