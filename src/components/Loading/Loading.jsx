import "./Loading.css";

export function Loading(props) {
    const style = {
        width: 350,
        height: 175,
        backgroundColor: "silver",
        borderWidth: 1,
        borderColor: "white",
        borderStyle: "solid",
        opacity: .08,
        borderRadius: 5,
        boxSizing: "border-box",
        overflow: "hidden",
        boxShadow: "0 0 5px #000",
        ...props.style
    }
    const sweeperStyle = {
        width: 350,
        height: 175,
        background: "linear-gradient(-45deg, transparent 35%, white, transparent 65%)",
        animation: "sweep 1s linear infinite"
    }
    return <div className="loading-component" style={style}>
        <div className="loading-component__ sweeper" style={sweeperStyle} />
    </div>
}