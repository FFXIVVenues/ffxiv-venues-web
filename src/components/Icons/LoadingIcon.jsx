import loadingIcon from "../../assets/icons/loading-icon.webp";

export function LoadingIcon(props) {
    return <img
      className={ "icons__loading " + (props.className ? props.className : "") }
      alt="Loading search results..."
      src={loadingIcon}
    />
}