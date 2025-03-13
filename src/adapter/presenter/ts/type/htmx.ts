export type HXTriggerEvent<T = unknown> = CustomEvent & { detail: { value: T } }
export type HXEvent = CustomEvent & {
	detail: {
		failed: boolean,
		pathInfo: {
			anchor?: string,
			finalRequestPath?: string,
			requestPath?: string,
			responsePath?: string,
		},
		requestConfig: {
			elt: HTMLElement,
		}
	}
}
