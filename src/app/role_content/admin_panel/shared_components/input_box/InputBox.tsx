import './InputBox.scss';

type InputBoxProps = {
    name: string;
    type?: string;
    suggestion?: string;
    ref?: any;
    textHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox: React.FC<InputBoxProps> = ({ name, type = 'text', suggestion='',ref, textHandler }): JSX.Element => {
    return (
        <div>
            <ul className="input_box">
                <li>
                    <label htmlFor={name}>{name}</label>
                    <input type={type} name={name} maxLength={100} onChange={textHandler} ref={ref??undefined}/>
                    <span>{suggestion}</span>
                </li>
            </ul>
        </div>
    );
};

export default InputBox;
