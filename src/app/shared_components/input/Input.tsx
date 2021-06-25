import './input.scss';
export default function Input(props: any) {
    // required props : value , onchange , name , title
    const className = `input input__${props.title}`;
    const icon = `${props.icon}`;
    const type = props.type ? props.type : 'text';
    const placeholder = props.placeholder ? props.placeholder : props.title;
    return (
        <div>
            {icon && <i className={`input-icon ${icon}`}></i>}
            <input
                type={type}
                className={className}
                placeholder={placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            ></input>
        </div>
    );
}
