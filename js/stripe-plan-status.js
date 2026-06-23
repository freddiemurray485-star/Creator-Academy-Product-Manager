/* Stripe Plan Link Status Helper */
(function () {
	"use strict";

	function toast(message) {
		if (typeof window.showToast === "function") window.showToast(message);
		else console.log(message);
	}

	async function checkStripeBackend() {
		try {
			const response = await fetch("/api/health");
			const data = await response.json().catch(() => ({}));

			if (!response.ok || !data.ok) {
				throw new Error(data.error || "Health endpoint failed.");
			}

			toast("Backend health endpoint is reachable. Test a checkout to verify Stripe env vars.");

			return data;
		} catch (error) {
			console.error(error);
			toast("Could not check Stripe backend status.");
			return null;
		}
	}

	window.checkStripeBackend = checkStripeBackend;
})();
