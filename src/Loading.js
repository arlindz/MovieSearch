import "./loading.css";
export default function Loading() {
    return (
        <div className="loading-container">
            <div className="spinner spinner-red"></div>
            <div className="spinner spinner-yellow"></div>
            <div className="spinner spinner-blue"></div>
        </div>
    );
}