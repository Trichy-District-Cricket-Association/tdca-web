import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../../../../../../firebase';
import { Collections } from '../../../../../../enums/collection';
import Ground from '../../../../../../models/Ground';
import InputBox from '../../../shared_components/input_box/InputBox';

const GroundAdd: React.FC<void> = (): JSX.Element => {
    const [ground, setGround] = useState<Ground>(
        new Ground({
            groundId: '',
            groundName: '',
            totalMatches: 0,
            divisionMatches: { one: 0, two: 0, three: 0, four: 0, five: 0 },
            typeMatches: { interDistrictMatch: 0, knockoutMatch: 0, leagueMatch: 0, schoolMatch: 0 },
        }),
    );
    
    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = `${e.target.name}` as const;
        const newGround = ground!;
        newGround.handleGround({ field: fieldName, value: e.target.value });
        setGround(newGround);
    };

    const submitForm =async()=>{
        await firestore.collection(Collections.grounds).add(JSON.parse(JSON.stringify(ground)));
    };

    return (
        <form >
            <InputBox name="groundId" type="text" />
            <InputBox name="groundName" type="text" />
            <InputBox name="totalMatches" type="number" />
            <InputBox name="divisionMatches_one" type="number" />
            <InputBox name="divisionMatches_two" type="number" />
            <InputBox name="divisionMatches_three" type="number" />
            <InputBox name="divisionMatches_four" type="number" />
            <InputBox name="divisionMatches_five" type="number" />
            <InputBox name="typeMatches_interDistrictMatch" type="number" />
            <InputBox name="typeMatches_knockoutMatch" type="number" />
            <InputBox name="typeMatches_leagueMatch" type="number" />
            <InputBox name="typeMatches_schoolMatch" type="number" />
            <button onClick={submitForm}>Save</button>
        </form>
    );
};

export default GroundAdd;
