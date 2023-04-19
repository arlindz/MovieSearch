export default function initializeURL() {
  const defaultParams = {
    page: 1,
    priority: "mostPopular"
  };
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  let bool = false;
  for (const key in defaultParams)
    if (!searchParams.has(key)) {
      bool = true;
      searchParams.append(key, defaultParams[key]);
    }
  if (bool === true) window.history.pushState(null, null, url.href);
}
