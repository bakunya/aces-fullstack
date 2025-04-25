import { AssessorRequirement } from "@src/application/dto/assessor-requreiment";
import { FormattedGroupAllocation } from "@src/application/dto/formatted-group-allocation";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";

export type GetAllocationExecutionReturn = {
	assessorAllocated: {
		face_assessors: (TableAssessorBatch & {
			email: string;
            username: string;
            fullname: string;
        })[];
        disc_assessors: (TableAssessorBatch & {
			email: string;
            username: string;
            fullname: string;
        })[];
        case_assessors: (TableAssessorBatch & {
			email: string;
            username: string;
            fullname: string;
        })[];
    };
    assessorRequirement: AssessorRequirement;
	groupAllocation: FormattedGroupAllocation | undefined;
}

export interface IGetAllocation {
	getAssessorRequirement(batch_id: string): Promise<AssessorRequirement>;
	getGroupAllocation(batchId: string): Promise<FormattedGroupAllocation | undefined>;
	getAssessorAllocated(batchId: string): Promise<{
		face_assessors: (TableAssessorBatch & {
			email: string;
			username: string;
			fullname: string;
		})[];
		disc_assessors: (TableAssessorBatch & {
			email: string;
			username: string;
			fullname: string;
		})[];
		case_assessors: (TableAssessorBatch & {
			email: string;
			username: string;
			fullname: string;
		})[];
	}>
}