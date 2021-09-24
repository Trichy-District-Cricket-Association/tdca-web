import './InputBox.scss';

type InputBoxProps = {
    title: string;
    name: string;
    type?: string;
    suggestion?: string;
    value?: any;
    ref?: any;
    textHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox: React.FC<InputBoxProps> = ({
    title,
    name,
    type = 'text',
    suggestion = '',
    value,
    ref,
    textHandler,
}): JSX.Element => {
    let pattern;
    {
        switch (name) {
            case 'emailId':
                pattern = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
                break;
            case 'primaryContact' || 'secondaryContact' || 'payPhoneNumber':
                pattern = '^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$';
                break;
            case 'aadharNumber':
                pattern = '^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$';
                break;
            case 'bankIFSC':
                pattern = '^[A-Z]{4}0[A-Z0-9]{6}$';
                break;

            default:
                break;
        }
    }
    return (
        <div>
            <ul className="input_box">
                <li>
                    <label htmlFor={name}>{title}</label>
                    {name == 'aadharNumber' ||
                    name == 'umpireId' ||
                    name == 'umpireName' ||
                    name == 'emailId' ||
                    name == 'primaryContact' ||
                    name == 'dateOfBirth' ||
                    name == 'scorerId' ||
                    name == 'scorerName' ||
                    name == 'groundId' ||
                    name == 'groundName' ||
                    name == 'groundsManId' ||
                    name == 'groundsManName' ||
                    name == 'playerId' ||
                    name == 'playerName' ||
                    name == 'teamId' ||
                    name == 'teamName' ||
                    name == 'teamColor' ||
                    name == 'matchId' ||
                    name == 'date' ||
                    name == 'dateOfRegisteration' ||
                    name == 'registerationFee' ? (
                        <input
                            type={type}
                            name={name}
                            min={0}
                            maxLength={100}
                            onChange={textHandler}
                            defaultValue={value}
                            ref={ref ?? undefined}
                            required
                            pattern={pattern ? pattern : '.*'}
                        />
                    ) : (
                        <input
                            type={type}
                            name={name}
                            min={0}
                            maxLength={100}
                            onChange={textHandler}
                            defaultValue={value}
                            ref={ref ?? undefined}
                        />
                    )}

                    <span>{suggestion}</span>
                </li>
            </ul>
        </div>
    );
};

export default InputBox;
