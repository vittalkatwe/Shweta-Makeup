// CleverTap is initialized via CDN script tag in index.html.
// Use a Proxy so property access always reads the live window.clevertap,
// even after the SDK replaces the initial queue object.
const clevertap = new Proxy({}, {
  get(_target, prop) {
    return window.clevertap?.[prop]
  }
})

export default clevertap
