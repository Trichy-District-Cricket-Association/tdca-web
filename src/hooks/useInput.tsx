import React,{ useState } from "react";

const useInput = (initialValue='') => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return {
        text:value,
        onChange: handleChange
    };
};

export default useInput;