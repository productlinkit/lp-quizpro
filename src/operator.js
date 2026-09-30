// The U9 confirmation step, isolated so the real U9 flow can replace it.
// Today: a simulated round trip driven by the demo panel switches.
// Later: send the user to U9's consent page (or call its API) here and resolve with the same three results.
import C from "./config.js";

// Resolves with "success" | "error" | "blocked".
export function requestConfirmation({ pkg, sim }) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (sim.network === "blocked") return resolve("blocked");
      resolve(sim.result === "error" ? "error" : "success");
    }, C.confirmDelayMs);
  });
}
