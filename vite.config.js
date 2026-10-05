import react from "@vitejs/plugin-react";

// Served from the site root so older links such as /offer still load the same assets.
export default { base: "/", plugins: [react()] };
