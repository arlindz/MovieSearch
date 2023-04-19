import "./pugination.css";
export default function Pugination({ page }) {
  const url = new URL(window.location.href);
  const search = url.searchParams;
  search.set("page", page);
  url.search = search.toString();

  return (
    <a href={url.href}>
      <div className="pugination">
        <p> {page}</p>
      </div>
    </a>
  );
}
