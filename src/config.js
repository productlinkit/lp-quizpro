// All QuizPro settings live here. User-facing copy lives in i18n/my.json and i18n/en.json;
// the package is named there under the same id used below.
export default {
  cancelCode: "*XXXX#",   // placeholder until U9 assigns the real code
  appUrl: "https://mm.quizpro.mobi",   // QuizPro app: "Start Playing" and already-subscribed users go here
  defaultLang: "my",

  // The only package on offer. Copy: i18n keys "packages.<id>.name", "offer.line1.<id>", "offer.line2.<id>".
  pkg: { id: "daily", price: 200, days: 1 },

  // Simulated U9 round trip after "Confirm", in milliseconds.
  confirmDelayMs: 900,
  // How long the "Opening QuizPro" notice shows before an already-subscribed user is sent to the app.
  redirectDelayMs: 1200,

  // Query parameters used by the prototype itself; they are not forwarded to the QuizPro app.
  // "pkg" is still dropped so older /offer?pkg=… links don't pass it on.
  internalParams: ["dev", "lang", "net", "sub", "result", "pkg"],
};
