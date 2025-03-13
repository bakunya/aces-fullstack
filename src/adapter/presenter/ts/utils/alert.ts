const alertError = (message: string) => `
	<div id="error-alert" class="w-[95%] max-w-[800px] z-[9999] fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-100 text-white px-4 py-3 rounded-lg">
		<button class="absolute -top-2 -right-5 transform -translate-x-1/2 bg-red-400 cursor-pointer text-white p-1 rounded-full text-xs">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
				<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
			</svg>
		</button>
		<p class="text-red-700 text-sm font-semibold">${message}</p>
	</div>
`

let timeoutError: any = null;
let timeoutErrorFromQueryString: any = null;

function showAlertError(message: string) {
	const container = document.getElementById("alert-container")
	if (!container) return
	container.innerHTML = alertError(message)
	if (timeoutError) clearTimeout(timeoutError)
	timeoutError = setTimeout(() => { container.innerHTML = "" }, 3000)
	container.querySelector("button")?.addEventListener("click", () => {
		container.innerHTML = ""
		if (timeoutError) clearTimeout(timeoutError)
	})
}

function showAlertErrorFromQueryString() {
	const urlString = window.location.href;
	const url = new URL(urlString);
	const params = new URLSearchParams(url.search);
	const error = params.get("error")
	if(error) {
		showAlertError(error)
	}
	if (timeoutErrorFromQueryString) clearTimeout(timeoutErrorFromQueryString)
	timeoutErrorFromQueryString = setTimeout(() => {
		window.history.replaceState({}, "", window.location.pathname)
	}, 3000)
}

export { showAlertError, showAlertErrorFromQueryString }
