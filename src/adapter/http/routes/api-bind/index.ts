import { apiBindBatchDetail } from "@src/adapter/http/controllers/api-bind-batch-detail";
import { apiBindBatchModules } from "@src/adapter/http/controllers/api-bind-batch-modules";
import { apiBindPersonLoginController } from "@src/adapter/http/controllers/api-bind-person-login";
import { validApiBindKey } from "@src/adapter/http/middleware/valid-api-bind-key";
import { Hono } from "hono";

const apiBindRoutes = new Hono()

apiBindRoutes.use(validApiBindKey)
apiBindRoutes.get("batch/:token", apiBindBatchDetail)
apiBindRoutes.get("batch/:token/modules", apiBindBatchModules)
apiBindRoutes.post("login", apiBindPersonLoginController)

export default apiBindRoutes