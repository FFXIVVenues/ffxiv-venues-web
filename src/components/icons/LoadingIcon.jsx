import { ReactComponent as LoadingIconSvg } from "../../assets/icons/loading-icon.svg";

export function LoadingIcon(props) {
    return <LoadingIconSvg className={ "loading-icon " + (props.className ? props.className : "") } />
}