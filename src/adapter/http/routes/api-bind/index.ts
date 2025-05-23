import { apiBindBatchDetail } from "@src/adapter/http/controllers/api-bind-batch-detail";
import { apiBindBatchGroupController } from "@src/adapter/http/controllers/api-bind-batch-group";
import { apiBindBatchModules } from "@src/adapter/http/controllers/api-bind-batch-modules";
import { apiBindPersonLoginController } from "@src/adapter/http/controllers/api-bind-person-login";
import { validApiBindKey } from "@src/adapter/http/middleware/valid-api-bind-key";
import { Hono } from "hono";

const apiBindRoutes = new Hono()

apiBindRoutes.use(validApiBindKey)
apiBindRoutes.get("batch/:token", apiBindBatchDetail)
apiBindRoutes.get("batch/:token/modules", apiBindBatchModules)
apiBindRoutes.get("batch/:batch_id/group/:person_id", apiBindBatchGroupController)
apiBindRoutes.post("login", apiBindPersonLoginController)

export default apiBindRoutes