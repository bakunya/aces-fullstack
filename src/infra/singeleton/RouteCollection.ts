import { AppError } from "@src/application/error/AppError";

type Route = { path: string; method: string };
export type RouteMap = Record<string, Route>;

export class RouteCollection {
	private static instance: RouteCollection;
	private routes: RouteMap = {};

	private constructor() { }

	static getInstance(): RouteCollection {
		if (!RouteCollection.instance) {
			throw AppError.route("RouteCollection instance not found");
		}
		return RouteCollection.instance;
	}

	static createInstance(appRoutes: Route[]): RouteCollection {
		if (RouteCollection.instance) {
			return RouteCollection.instance;
		}


		RouteCollection.instance = new RouteCollection();
		RouteCollection.instance.routes = RouteCollection.instance.convertToRouteMap(appRoutes);
		return RouteCollection.instance;
	}

	convertToRouteMap(appRoutes: Route[]): RouteMap {
		return appRoutes.reduce(
			(acc, route) => {
				const name = `${route.method} ${route.path.replace(/[/\-:*]/g, " ")}`.split(" ").filter(Boolean).join(".").toLocaleLowerCase()
				acc[name] = {
					path: route.path,
					method: route.method
				}
				return acc
			},
			{} as RouteMap
		)
	}

	get(routeName: string): Route | undefined {
		return this.routes[routeName];
	}

	set(appRoutes: Route[]): void {
		this.routes = RouteCollection.instance.routes = RouteCollection.instance.convertToRouteMap(appRoutes);
	}

	getAll(): RouteMap {
		return this.routes;
	}
}

export function route(
	string: string,
	values?: (string | number)[],
	queries?: Record<string, string | number | (string | number)[]>
): string {
	const route = RouteCollection.getInstance().get(string)?.path;
	if (!route) throw AppError.route(`Route "${string}" not found`);

	const placeholders = route.match(/:[^\/]+/g) || [];
	const valuesLength = values ? values.length : 0;
	if (placeholders.length !== valuesLength) {
		throw AppError.route(
			`Route "${string}" requires ${placeholders.length} parameters, but got ${valuesLength}.`
		);
	}

	let index = 0;
	let url = route.replace(/:[^\/]+/g, () => String(values![index++]));

	if (queries) {
		const queryString = Object.entries(queries)
			.map(([key, value]) => {
				if (Array.isArray(value)) {
					return value
						.map((v) => `${encodeURIComponent(key)}[]=${encodeURIComponent(String(v))}`)
						.join('&');
				}
				return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
			})
			.join('&');

		if (queryString) {
			url += `?${queryString}`;
		}
	}

	return url;
}


export function routeAll(): RouteMap {
	return RouteCollection.getInstance().getAll();
}