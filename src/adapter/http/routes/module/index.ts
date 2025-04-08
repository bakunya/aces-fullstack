import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";
import { moduleDashboardController } from "@src/adapter/http/controllers/module-dashboard";
import { moduleCaseAnalysDevController } from "@src/adapter/http/controllers/module-case-analys-dev";
import { hxModuleCaseAnalysDevMainContentController } from "@src/adapter/http/controllers/hx-module-case-analys-dev-main-content";
import { hxModuleCaseAnalysGetQuillMainContentController } from "@src/adapter/http/controllers/hx-module-case-analys-dev-get-main-content";
import { hxModuleCaseAnalysAssignmentController } from "@src/adapter/http/controllers/hx-module-case-analys-dev-assignment";
import { hxModuleCaseAnalysAssignmentListController } from "@src/adapter/http/controllers/hx-module-case-analys-dev-assignment-list";
import { hxModuleCaseAnalysAssignmentUpdateController } from "@src/adapter/http/controllers/hx-module-case-analys-dev-assignment-update";
import { hxModuleCaseAnalysNewQuestionController } from "@src/adapter/http/controllers/hx-module-case-analys-dev-question";
import { hxModuleCaseAnalysQuestionUpdateController } from "@src/adapter/http/controllers/hx-module-case-analys-dev-question-update";
import { moduleIntrayDevController } from "@src/adapter/http/controllers/module-intray-dev";
import { moduleIntraySectionDevController } from "@src/adapter/http/controllers/module-intray-section-dev";
import { hxModuleIntraySectionUpdateDevController } from "@src/adapter/http/controllers/hx-module-intray-section-update-dev";
import { hxModuleIntraySectionDevController } from "@src/adapter/http/controllers/hx-module-intray-section-dev";

const moduleRoutes = new Hono()

moduleRoutes.use(shouldUser(UserRole.MODULE))
moduleRoutes.get("dashboard", moduleDashboardController)

moduleRoutes.get("dashboard/csi/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/lgd/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/gpq/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/gpro/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/aime/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/gmate/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/ggate/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/verbal/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/abstract/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/gpq_gmate/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/numerical/:id/dev", c => c.text("unimplemented"))
moduleRoutes.get("dashboard/interview/:id/dev", c => c.text("unimplemented"))

moduleRoutes.get("dashboard/intray/:id/dev", moduleIntrayDevController)
moduleRoutes.get("dashboard/intray/:id/dev/section/:section_type", moduleIntraySectionDevController)
moduleRoutes.get("hx/dashboard/intray/:id/dev/section/:section_type", hxModuleIntraySectionDevController)
moduleRoutes.put("hx/dashboard/intray/:id/dev/section/:section_type", hxModuleIntraySectionUpdateDevController)

moduleRoutes.get("dashboard/case_analysis/:id/dev", moduleCaseAnalysDevController)
moduleRoutes.put("hx/case_analysis/:id/dev/main-content", hxModuleCaseAnalysDevMainContentController)
moduleRoutes.get("hx/case_analysis/:id/dev/main-content", hxModuleCaseAnalysGetQuillMainContentController)
moduleRoutes.post("hx/case_analysis/:id/dev/assignment", hxModuleCaseAnalysAssignmentController)
moduleRoutes.get("hx/case_analysis/:id/dev/assignment/list", hxModuleCaseAnalysAssignmentListController)
moduleRoutes.put("hx/case_analysis/:id/dev/assignment/:assignment_id", hxModuleCaseAnalysAssignmentUpdateController)
moduleRoutes.post("hx/case_analysis/:id/dev/assignment/:assignment_id/question", hxModuleCaseAnalysNewQuestionController)
moduleRoutes.put("hx/case_analysis/:id/dev/assignment/:assignment_id/question/:question_id", hxModuleCaseAnalysQuestionUpdateController)

moduleRoutes.route("", moduleRoutes)

export default moduleRoutes