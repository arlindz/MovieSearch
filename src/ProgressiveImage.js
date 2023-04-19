import "./movie.css";
import "./styles.css";
import "./movieCard.css";
import { useState } from "react";
import Loading from "./Loading";
export default function ProgressiveImage({ setImage, fullImg, blurredImg, class_name }) {
    const [loaded, setLoaded] = useState(false);
    const [blurryLoaded, setBlurryLoaded] = useState(false);
    const style = { display: blurryLoaded ? "block" : "none", opacity: loaded ? "1" : "0" };
    return (
        <>
            {!blurryLoaded && <div style={{ width: "100%", minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><Loading /></div >}
            {!loaded && <img style={{ opacity: blurryLoaded ? "1" : "0", position: "absolute", width: "100%", height: "100%" }} onLoad={() => { setImage(); setBlurryLoaded(true); console.log("blurry image loaded") }} className={class_name} src={blurredImg} />}
            <img className={class_name} style={style} src={fullImg} onLoad={() => { setLoaded(true); setBlurryLoaded(true); setImage(); console.log("high quality image loaded") }} />
        </>
    );
}