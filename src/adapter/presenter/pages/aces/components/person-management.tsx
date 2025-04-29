import { FormPerson } from "@presenter/pages/aces/components/form-person";
import { PersonTable } from "@presenter/pages/aces/components/person-table";

type Props = {
	batchId: string,
	persons: {
		batchId: string,
		name: string,
		nip: string,
		hash: string,
		email: string,
		gender: string,
		username: string,
		plain?: string,
		id?: string,
		batchGroupId?: number,
		organizationId?: string,
	}[]
}

export function PersonManagement({ persons, batchId }: Props) {
	return Boolean(persons?.length) 
	? (
		<div className="grid grid-cols-12 mt-12" x-data="uploadedPerson()" x-ref="uploadedPerson">
			<div className="col-span-8">
				<PersonTable
					persons={ persons }
					shouldShow={ Boolean(persons?.length) }
				/>
			</div>
			<div className="col-span-4 relative">
				<div className="pt-5 sticky top-0">
					<FormPerson
						batchId={ batchId }
						shouldShow={ Boolean(persons?.length) }
					/>
				</div>
			</div>
		</div>
	)
	: null
}