// All QuizPro settings live here. User-facing copy lives in i18n/my.json and i18n/en.json;
// each package is named there under the same id used below.
export default {
  cancelCode: "*XXXX#",   // placeholder until U9 assigns the real code
  appUrl: "https://mm.quizpro.mobi",   // QuizPro app: "Start Playing" and already-subscribed users go here
  defaultLang: "my",
  defaultPackage: "daily",

  // Name and access copy for each package: i18n keys "packages.<id>.name" / "packages.<id>.access".
  // The main package gets the large card across the full row; the others sit below it, smaller.
  packages: [
    { id: "daily", price: 200, days: 1, main: true },
    { id: "weekly", price: 735, days: 7 },
    { id: "monthly", price: 999, days: 30 },
  ],

  // Leave a link empty until its page exists; an empty link does nothing when tapped.
  links: { terms: "", privacy: "", help: "" },

  // Simulated U9 round trip after "Confirm", in milliseconds.
  confirmDelayMs: 900,
  // How long the "Opening QuizPro" notice shows before an already-subscribed user is sent to the app.
  redirectDelayMs: 1200,

  // Query parameters used by the prototype itself; they are not forwarded to the QuizPro app.
  internalParams: ["dev", "lang", "net", "sub", "result", "pkg"],
};
