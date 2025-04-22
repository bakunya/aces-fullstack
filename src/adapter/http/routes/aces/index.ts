import { Hono } from "hono";
import { shouldUser } from "@src/adapter/http/middleware/should-user";
import { UserRole } from "@src/domain/User";
import { batchOrganizationController } from "@src/adapter/http/controllers/batch-organization";
import { batchAssessmentController } from "@src/adapter/http/controllers/batch-assessment";
import { batchOrganizationCreateBatchController } from "@src/adapter/http/controllers/batch-organization-create-batch";
import { batchBatchDetailController } from "@src/adapter/http/controllers/batch-detail";
import { batchHxUpdateBatchController } from "@src/adapter/http/controllers/batch-hx-update-batch";
import { batchHxCreateOrganizationController } from "@src/adapter/http/controllers/batch-hx-create-organization";
import { acesHxGetOrganizationTableController } from "@src/adapter/http/controllers/aces-hx-get-organization-table";
import { batchBatchPersonController } from "@src/adapter/http/controllers/batch-person";
import { batchHxCreateBatchModuleController } from "@src/adapter/http/controllers/batch-hx-create-batch-module";
import { acesGetBatchModuleTableController } from "@src/adapter/http/controllers/aces-get-batch-module-table";
import { acesGetFormAddBatchModuleController } from "@src/adapter/http/controllers/aces-get-form-add-batch-module";
import { batchHxDeleteBatchModuleController } from "@src/adapter/http/controllers/batch-hx-delete-batch-module";
import { acesCreateBatchPersonController } from "@src/adapter/http/controllers/aces-create-batch-person";
import { hxBatchPersonMutationController } from "@src/adapter/http/controllers/aces-batch-person-mutation";
import { acesGetPersonTableController } from "@src/adapter/http/controllers/aces-get-person-table";
import { acesGetPersonMutationFormController } from "@src/adapter/http/controllers/aces-get-person-mutation-form";
import { acesGetUploaderTableController } from "@src/adapter/http/controllers/aces-get-person-uploader";
import { acesGetUploaderManagementController } from "@src/adapter/http/controllers/aces-get-person-management";
import { acesDeleteBatchPersonController } from "@src/adapter/http/controllers/aces-delete-batch-person";

const acesRoutes = new Hono()

acesRoutes.use(shouldUser(UserRole.ACES))
acesRoutes.get("batch/:batch_id", batchBatchDetailController)
acesRoutes.get("batch/:batch_id/person", batchBatchPersonController)
acesRoutes.get("dashboard", c => c.html("Dashboard Aces"))
acesRoutes.get("dashboard/assessment", batchAssessmentController)
acesRoutes.get("dashboard/organization", batchOrganizationController)
acesRoutes.post("organization/:organization_id/batch", batchOrganizationCreateBatchController)

acesRoutes.get("hx/organization_table", acesHxGetOrganizationTableController)
acesRoutes.put("hx/batch/:batch_id", batchHxUpdateBatchController)
acesRoutes.post("hx/organization", batchHxCreateOrganizationController)
acesRoutes.post("hx/batch/:batch_id/module", batchHxCreateBatchModuleController)
acesRoutes.delete("hx/batch/:batch_id/module/:module_id", batchHxDeleteBatchModuleController)
acesRoutes.get("hx/batch/:batch_id/batch_module_table", acesGetBatchModuleTableController)
acesRoutes.get("hx/batch/:batch_id/form_add_batch_module", acesGetFormAddBatchModuleController)
acesRoutes.post("hx/batch/:batch_id/person", acesCreateBatchPersonController)
acesRoutes.delete("hx/batch/:batch_id/person/:person_id", acesDeleteBatchPersonController)
acesRoutes.put("hx/batch/:batch_id/person", hxBatchPersonMutationController)
acesRoutes.get("hx/batch/:batch_id/person_table", acesGetPersonTableController)
acesRoutes.get("hx/batch/:batch_id/person_uploader", acesGetUploaderTableController)
acesRoutes.get("hx/batch/:batch_id/person_management", acesGetUploaderManagementController)
acesRoutes.get("hx/batch/:batch_id/person_form", acesGetPersonMutationFormController)

acesRoutes.route("", acesRoutes)

export default acesRoutes