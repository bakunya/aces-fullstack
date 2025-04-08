import { IntrayDevUrlParam } from "@src/adapter/http/contracts/request/intray-dev";
import { Context } from "@src/adapter/http/contracts/binding";
import { route } from "@src/infra/singeleton/RouteCollection";

export async function moduleIntrayDevController(c: Context) {
	return c.redirect(route(
		"get.module.dashboard.intray.id.dev.section.section_type", 
		[c.req.param(IntrayDevUrlParam.id), "intray_intro"]
	))
}