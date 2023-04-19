import "./movie.css";
import "./styles.css";
import "./movieCard.css";
import { useState } from "react";
export default function ProgressiveImage({ fullImg, blurredImg, class_name }) {
    const [loaded, setLoaded] = useState(false);
    const [blurryLoaded, setBlurryLoaded] = useState(false);
    const style = { display: blurryLoaded ? "block" : "none", opacity: loaded ? "1" : "0" };
    return (
        <>
            {!loaded && <img style={{ position: "absolute", width: "100%", height: "100%" }} onLoad={() => { setBlurryLoaded(true) }} className={class_name} src={blurredImg} />}
            <img className={class_name} style={style} src={fullImg} onLoad={() => { setLoaded(true); }} />
        </>
    );
}