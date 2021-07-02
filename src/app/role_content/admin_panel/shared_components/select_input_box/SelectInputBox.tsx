import './SelectInputBox.scss';

type SelectInputBoxProps = {
    title: string;
    name: string;
    options: any[];
    suggestion?: string;
    textHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const SelectInputBox: React.FC<SelectInputBoxProps> = ({
    title,
    name,
    options,
    suggestion = '',
    textHandler,
}): JSX.Element => {
    return (
        
        <div>
            <ul className="selectInputBox">
                <li>
                    <label htmlFor={name}>{title}</label>
                    <select name= {name} onChange={textHandler} className = "selectInputBox__select">
                        <option></option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <span>{suggestion}</span>
                </li>
            </ul>
        </div>
    );
};

export default SelectInputBox;
