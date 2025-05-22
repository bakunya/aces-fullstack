import { LandingPage } from "@presenter/pages/shared/landing";
import { Context } from "@src/adapter/http/contracts/binding";

export async function landingPageController(c: Context) {
	return c.html(<LandingPage />)
}