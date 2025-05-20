import { LandingPage } from "@presenter/pages/shared/landing";
import { Context } from "@src/adapter/http/contracts/binding";

export async function landingPageController(c: Context) {
	
	const data = await c.env.WEB_TEST.fetch("https://mock.com/api-bind/modules", {
		headers: {
			"x-api-key": c.env.WEB_TEST_API_KEY,
		}
	})
	const x = await data.json()
	console.log(x)

	return c.html(<LandingPage />)
}