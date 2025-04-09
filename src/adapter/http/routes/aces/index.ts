import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";
import { acesModulesController } from "@src/adapter/http/controllers/aces-modules";
import { acesNewModulesController } from "@src/adapter/http/controllers/aces-modules-new";
import { acesCreateModulesController } from "@src/adapter/http/controllers/aces-modules-create";
import { batchOrganizationController } from "@src/adapter/http/controllers/batch-organization";
import { batchAssessmentController } from "@src/adapter/http/controllers/batch-assessment";
import { batchOrganizationCreateBatchController } from "@src/adapter/http/controllers/batch-organization-create-batch";
import { batchBatchDetailController } from "@src/adapter/http/controllers/batch-detail";
import { batchHxUpdateBatchController } from "@src/adapter/http/controllers/batch-hx-update-batch";
import { batchHxCreateOrganizationController } from "@src/adapter/http/controllers/batch-hx-create-organization";
import { acesHxGetOrganizationTableController } from "@src/adapter/http/controllers/aces-hx-get-organization-table";

const acesRoutes = new Hono()

acesRoutes.use(shouldUser(UserRole.ACES))
acesRoutes.get("dashboard", c => c.html("Dashboard Aces"))
acesRoutes.get("dashboard/modules", acesModulesController)
acesRoutes.get("dashboard/modules/new", acesNewModulesController)
acesRoutes.post("dashboard/modules/new", acesCreateModulesController)
acesRoutes.get("dashboard/organization", batchOrganizationController)
acesRoutes.get("dashboard/assessment", batchAssessmentController)
acesRoutes.post("organization/:organization_id/batch", batchOrganizationCreateBatchController)
acesRoutes.get("batch/:batch_id", batchBatchDetailController)

acesRoutes.get("hx/organization_table", acesHxGetOrganizationTableController)
acesRoutes.put("hx/batch/:batch_id", batchHxUpdateBatchController)
acesRoutes.post("hx/organization", batchHxCreateOrganizationController)

acesRoutes.route("", acesRoutes)

export default acesRoutes