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
