import "./person.css";

export function Person(props) {
    return  <div className="staff-member">
                <img src={`https://img2.finalfantasyxiv.com/f/${props.photoId}_96x96.jpg`} alt=""/>
                <div className="staff-member__details">
                    <div className="staff-member__name"><a target="_blank" rel="noreferrer" href={props.link ? props.link : "https://discordapp.com/users/" + props.discordId}>{props.name}</a>, {props.world}.</div>
                    <div className="staff-member__role">{props.role}</div>
                </div>
            </div>
}