import "./TextBox.css";

import debounce from "debounce";

export const TextBox = ({ className, Icon, label, onChange }) => {
  const debouncedOnChange = debounce(onChange, 500);

  return <div className={"textbox__container " + className}>
    <Icon />
    <input type="textbox"
           placeholder={label}
           aria-label={label}
           onChange={debouncedOnChange}/>
  </div>
}
