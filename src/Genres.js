import "./genres.css";
import { useState } from "react";
export default function Genres({ genres }) {
    const [clicked, setClicked] = useState({});
    const data = [];

    for (const key in genres) {
        data.push(<div style={styler(key)} onClick={() => {
            setClicked((prev) => {
                return { ...prev, [key]: !prev[key] };
            });
        }} className="genre-container"><p>{genres[key]}</p></div>);
    }
    function handleClick() {
        let genres = "";
        for (const key in clicked)
            if (clicked[key] == true) genres += key + ",";
        if (genres.length === 0) return;
        genres = genres.substring(0, genres.length - 1);
        const url = new URL(window.location.href);
        const search = url.searchParams;
        search.set("priority", "discover");
        search.set("page", "1");
        search.set("genres", genres);
        url.search = search.toString();
        window.location.href = url.href;
    }
    function styler(genreId) {
        return clicked[genreId] ? { transform: "translateY(-5px)", boxShadow: "0px 5px 5px rgba(0,0,0,0.6)", backgroundColor: "#b3cb65", border: "1px solid #b3cb65" } : {};
    }
    return (
        <>
            <div className="genres-container">
                {data}
            </div>
            <div className="genre-filter-button" onClick={handleClick}><p>FILTER</p></div>
        </>
    );
}