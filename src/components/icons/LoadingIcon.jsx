import { ReactComponent as LoadingIconSvg } from "../../assets/icons/loading-icon.svg";

export function LoadingIcon(props) {
    return <LoadingIconSvg className={ "icons__loading " + (props.className ? props.className : "") } />
}