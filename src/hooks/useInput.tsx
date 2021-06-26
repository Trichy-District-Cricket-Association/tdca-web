import React, { useState } from 'react';

const useInput = (initialValue = ''): [string, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return [value, handleChange];
};

export default useInput;
