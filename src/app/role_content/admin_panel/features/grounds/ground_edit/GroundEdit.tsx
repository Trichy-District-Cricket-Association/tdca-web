import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Ground from '../../../../../../models/Ground';

type GroundEditProps = {
    ground: Ground;
};

const GroundEdit: React.FC<GroundEditProps> = ({ ground }): JSX.Element => {
    const {register,handleSubmit} = useForm<Ground>({defaultValues:ground});
    const onSubmit = useCallback((formValues: Ground) => {
        console.log(formValues);
    }, []);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button type="submit">Save</button>
        </form>
    );
};

export default GroundEdit;
