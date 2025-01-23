import { Context, Hono } from 'hono'
import { deleteCookie, getSignedCookie } from 'hono/cookie'
import adminRoutes from '@src/adapter/http/routes/admin'
import asesiRoutes from '@src/adapter/http/routes/asesi'
import asesorRoutes from '@src/adapter/http/routes/asesor'
import developerRoutes from '@src/adapter/http/routes/developer'
import { errorHandlerController } from '@src/adapter/http/controllers/error-handler'
import { landingPageController } from '@src/adapter/http/controllers/landing-page'
import { Crypto } from '@src/infra/crypto'

const app = new Hono()

app.get("/dev", async c => {
	const encryptKey = await Crypto.generateEncryptKey()
	return c.text(encryptKey)
})

app.get("/", landingPageController)

app.post("/logout", async (c: Context) => {
	deleteCookie(c, "token")
	return c.redirect("/")
})

app.route("/admin/", adminRoutes)
app.route("/asesor/", asesorRoutes)
app.route("/developer/", developerRoutes)

app.route("/", asesiRoutes)

app.onError(errorHandlerController)

export default app