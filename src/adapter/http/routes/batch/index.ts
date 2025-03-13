import { Hono } from "hono";
import { batchOrganizationController } from "@src/adapter/http/controllers/batch-organization";
import { batchHxCreateOrganizationController } from "@src/adapter/http/controllers/batch-hx-create-organization";
import { batchAssessmentController } from "@src/adapter/http/controllers/batch-assessment";
import { batchOrganizationCreateBatchController } from "@src/adapter/http/controllers/batch-organization-create-batch";
import { batchBatchDetailController } from "@src/adapter/http/controllers/batch-detail";
import { batchHxUpdateBatchController } from "@src/adapter/http/controllers/batch-hx-update-batch";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";

const batchRoutes = new Hono()

batchRoutes.use(shouldUser(UserRole.BATCH))

batchRoutes.get("organization", batchOrganizationController)
batchRoutes.get("assessment", batchAssessmentController)
batchRoutes.post("organization/:organization_id/batch", batchOrganizationCreateBatchController)
batchRoutes.get("batch/:batch_id", batchBatchDetailController)
batchRoutes.put("hx/batch/:batch_id", batchHxUpdateBatchController)
batchRoutes.post("hx/organization", batchHxCreateOrganizationController)

export default batchRoutes