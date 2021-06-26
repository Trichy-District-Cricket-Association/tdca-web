import './Button.scss';

export default function Button(props: any) {
    // required props : title , onclick ,
    const className = `btn btn__${props.title}`;
    const text = props.text ? props.text : props.title;
    return (
        <div>
            <button className={className} onClick={props.onClick}>
                {text}
            </button>
        </div>
    );
}
