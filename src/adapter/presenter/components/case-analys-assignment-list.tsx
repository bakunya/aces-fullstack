import { QuillElement } from "@presenter/components/quill-element"
import { route } from "@src/infra/singeleton/RouteCollection"
import { ulidFactory } from "ulid-workers"

type TElement = {
	id: string,
	name: string,
	domain: string,
	description: string,
}

type TCaseAnalysQuestionData = {
	modUuid: string,
	modTitle: string,
	mainContent: string,
	assignmentId: string,
	assignmentTitle: string,
	assignmentContent: string,
	questionId: string,
	questionContent: string,
	questionSequence: number,
	assignmentSequence: number,
	caseAnalysElement?: {
		id: string,
		idElement: string,
		idModCaQuestion: string,
	}[]
}


function QuestionItem({data}: {data:TCaseAnalysQuestionData}) {
	const id = data.questionId ?? ulidFactory()()

	return (
		<div className="mb-2 w-full">
			<input type="hidden" name="question-content" />
			<QuillElement
				initFunction={ `initQuestionQuill("${id}")` }
				dataSaved={ data?.questionContent ?? "Konten soal ..." }
			/>
		</div>
	)
}


export function CaseAnalysAssignmentList({ caseAnalys, elements }: { elements: Map<string, TElement>, caseAnalys: TCaseAnalysQuestionData[] }) {
	const data = Array.from(elements.entries().map(([id, element]) => ({
		id,
		value: element.name
	})))

	return (
		<>
			<div className="data-element" data-input={JSON.stringify(data)}></div>
			{
				caseAnalys.filter(x => x.assignmentId).map((v, i) => (
					<>
						{ v.assignmentId !== caseAnalys[i - 1]?.assignmentId && (
							<>
								<hr className="my-12" />
								<div className="bg-gray-200 p-5 rounded assignment" data-assignment={ JSON.stringify(v) } id={ `assignment-id-${v.assignmentId}` }>
									<div className="flex flex-col">
										<input type="text" name="assignment-sequence" className={ "font-bold mb-5 input input-neutral" } value={ v.assignmentSequence } />
										<input type="text" name="assignment-title" className={ "font-bold mb-5 input input-neutral" } value={ v.assignmentTitle ?? "Judul Tugas" } />
									</div>
									<input type="hidden" name="assignment-content" />
									<QuillElement
										initFunction={ `initAssignmentQuill(${v.assignmentId})` }
										dataSaved={ v?.assignmentContent ?? "Konten tugas ..." }
									/>
									<button
										className="btn btn-primary ml-auto block mt-4"
										hx-put={ route("put.module.hx.case_analysis.id.dev.assignment.assignment_id", [v.modUuid, v.assignmentId]) }
										hx-swap="none"
										hx-include={ `#assignment-id-${v.assignmentId} input` }
									>Simpan</button>
								</div>
							</>
						) }
						{ v.questionId && (
							<div 
								id={ `question-id-${v.questionId}` } 
								className="bg-gray-200 p-4 rounded mt-5"  
								x-data={`selectionApp(".data-element", "#question-id-${v.questionId} input.question-elements", ${JSON.stringify(v.caseAnalysElement?.map(v => v.idElement))})`}
							>
								<p className={ "font-bold mb-3 text-xs text-gray-600" }>{ v.assignmentTitle }</p>
								<input type="hidden" name="question-elements" className="question-elements" />
								<div className="flex justify-between mb-4">
									<div className="flex gap-2 items-center">
										<span>No.</span>
										<input 
											type="number" 
											name="question-sequence" 
											value={ v.questionSequence ?? 0 } 
											className={ "font-bold text-center input input-neutral w-[50px]" } 
										/>
									</div>
									<button x-on:click="modalOpen = true" class="btn btn-neutral">Pilih Elements</button>
								</div>
								<div class="flex flex-wrap gap-1 mb-4">
									<template x-for="item in items.filter(i => selectedItems.includes(i.id))" x-bin:key="item.id">
										<div x-on:click="removeSelected(item.id)" class="badge badge-secondary cursor-pointer">
											<span x-text="item.value"></span>
										</div>
									</template>
								</div>
								<div x-show="modalOpen" class="modal" x-bind:class="{ 'modal-open': modalOpen, 'modal-close': !modalOpen }">
									<div class="modal-box">
										<h3 class="font-bold text-lg mb-4">Pilih Item</h3>
										
										<input 
											type="text" 
											placeholder="Cari item..." 
											x-model="searchQuery" 
											class="input input-bordered w-full mb-4"
										/>
											
										<div class="max-h-60 overflow-y-auto">
											<template x-for="item in filteredItems()" x-bind:key="item.id">
												<div 
													x-on:click="toggleSelection(item.id)"
													x-bind:class="selectedItems.includes(item.id) ? 'bg-info' : 'hover:bg-gray-200'"
													class="p-2 rounded cursor-pointer mb-2"
												>
													<span x-text="item.value"></span>
												</div>
											</template>
										</div>
										<div class="modal-action">
											<button x-on:click="modalOpen = false" class="btn">Tutup</button>
										</div>
									</div>
								</div>
								
								<QuestionItem data={v} />
								<button 
									className="btn btn-primary ml-auto block mt-5" 
									hx-put={
										route(
											"put.module.hx.case_analysis.id.dev.assignment.assignment_id.question.question_id",
											[v.modUuid, v.assignmentId, v.questionId]
										)
									}
									hx-swap="none"
									hx-include={ `#elements-question-id-${v.questionId}, #question-id-${v.questionId} input` }
								>Simpan</button>
							</div>
						) }
						{ v.assignmentId !== caseAnalys[i + 1]?.assignmentId && (
							<button 
								className="mt-5 btn btn-neutral w-full" 
								hx-post={route("post.module.hx.case_analysis.id.dev.assignment.assignment_id.question", [v.modUuid, v.assignmentId])}
								hx-swap="none"
							>Tambah soal</button>
						) }
					</>
				))
			}
		</>
	)
}