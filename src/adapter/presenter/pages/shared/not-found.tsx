import { SharedHTMLHOC } from "@presenter/html/shared";
import { match, P } from "ts-pattern";

type TProps = {
	message?: string,
}

function Page({ message }: TProps) {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className="text-center">
				<h1 className="text-4xl mb-2">404</h1>
				{ match(message)
					.with(P.string, () => <p className="text-lg">{ message }</p>)
					.otherwise(() => <p className="text-lg">Halaman tidak ditemukan</p>) }
			</div>
		</div>
	)
}

export const NotFoundPage = SharedHTMLHOC(Page);