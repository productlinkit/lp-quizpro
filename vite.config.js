import react from "@vitejs/plugin-react";

// Served from the site root so nested routes such as /offer load the same assets.
export default { base: "/", plugins: [react()] };
