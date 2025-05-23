import { EachLoop } from "./../../utils/EachLoop";
import Input from "./Input";
import LabelInput from "./LabelInput";
import { useState } from "react";

const MultipleInput = ({
    id,
    label,
    placeholder,
    wrapperClassName = "",
    inputClassName = "",
    defaultList = [],
    register,
    dirtyField = false,
    errors,
    ...rest
}) => {
    const [inputValue, setInputValue] = useState("");
    const [inputList, setInputList] = useState(defaultList);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddInput = () => {
        if (inputValue) {
            setInputList([...inputList, inputValue]);
            setInputValue("");
        }
    };

    const handleRemoveInput = (index) => {
        const newInputList = inputList.filter((_, i) => i !== index);
        setInputList(newInputList);
    };

    return (
        <>
            <div className="p-4 mb-4">
                <div className={`grid lg:grid-cols-3 grid-cols-1 ${wrapperClassName}`}>
                    <LabelInput
                        id={id}
                        label={label}
                        className="my-auto"
                    />

                    <div className="flex items-center w-full col-span-2 relative">
                        <Input
                            id={id}
                            label={label}
                            placeholder={placeholder}
                            type="text"
                            className={inputClassName}
                            errors={errors}
                            register={register}
                            dirtyField={dirtyField}
                            value={inputValue}
                            onChange={handleInputChange}
                            {...rest}
                        />
                        <span
                            className="absolute right-5 text-primary top-5 cursor-pointer"
                            onClick={handleAddInput}>
                            Add New
                        </span>
                    </div>
                    {/* dirtyField &&  */ errors && <span className="text-red-500 text-sm">{errors.message}</span>}
                </div>
                <div className="flex gap-3 flex-wrap">
                    <EachLoop
                        of={inputList}
                        render={(item, index) => (
                            <div className="bg-grey px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                <span>{item}</span>
                                <span
                                    className="material-icons text-muted cursor-pointer absolute right-3 top-[7px]"
                                    onClick={() => handleRemoveInput(index)}>
                                    close
                                </span>
                            </div>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default MultipleInput;
