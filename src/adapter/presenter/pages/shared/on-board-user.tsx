import { SharedHTMLHOC } from "@presenter/html/shared";
import { UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type";
import { User, UserRole } from "@src/domain/User";
import { route } from "@src/infra/singeleton/RouteCollection";

type Props = {
	user: UserTypeCookie<User>
}

function Page({ user }: Props) {
	return (
		<div className="mx-auto w-7xl px-2 px-8">
			<nav className="mb-5" >
				<div className="relative flex h-16 items-center justify-between" >
					<div className="flex flex-1 items-center justify-center items-stretch justify-start" >
						<div className="flex shrink-0 items-center" >
							<a href={ route("get.auth.dashboard") } >
								<img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
							</a>
						</div>
						<div className="ml-6 block">
							<div className="flex space-x-4">
								{ user.role.get(UserRole.ACES) && (
									<>
										<a href={ route("get.aces.dashboard.organization") } className="rounded-md px-3 py-2 text-sm font-medium text-gray-500"> Organisasi </a>
										<a href={ route("get.aces.dashboard.assessment") } className="rounded-md px-3 py-2 text-sm font-medium text-gray-500"> Assessment </a>
									</>
								) }
							</div>
						</div>
					</div>
					<a href={ route("get.auth.logout") } className="rounded-md px-3 py-2 text-sm font-medium text-gray-500"> Logout </a>
				</div>
			</nav>
		</div>
	)
}

export const OnBoardUserPage = SharedHTMLHOC(Page);