import { EachLoop } from "@src/utils/EachLoop";
import Input from "./Input";
import LabelInput from "./LabelInput";
import SearchableSelect from "./SearchableSelect";
import Select from "./Select";
import Textarea from "./Textarea";

const InputWithLabel = ({
    id,
    label,
    labelOnTop = false,
    type,
    placeholder,
    wrapperClassName = "",
    inputClassName = "",
    register,
    dirtyField = false,
    errors,
    prependInput,
    appendInput,
    children,
    ...rest
}) => {
    const InputMap = () => {
        switch (type) {
            case "time":
            case "date":
            case "password":
            case "number":
            case "text":
            case "email":
                return (
                    <Input
                        id={id}
                        label={label}
                        placeholder={placeholder}
                        type={type}
                        className={inputClassName}
                        errors={errors}
                        register={register}
                        dirtyField={dirtyField}
                        prependInput={prependInput}
                        appendInput={appendInput}
                        {...rest}
                    />
                );
            case "radio":
                return (
                    <div className="flex items-center w-full col-span-2">
                        <EachLoop
                            of={rest.options || []}
                            render={(option) => {
                                return (
                                    <label className="mr-2 px-3 py-1 border border-transparent bg-grey2 text-lg w-full text-center rounded-full text-muted cursor-pointer hover:bg-primary hover:text-white transition-all duration-150">
                                        <Input
                                            id={id}
                                            type={"radio"}
                                            className={`hidden`}
                                            errors={errors}
                                            register={register}
                                            dirtyField={dirtyField}
                                            value={option.value}
                                            {...rest}
                                        />
                                        {option.label}
                                    </label>
                                );
                            }}
                        />
                    </div>
                );
            case "select":
                return (
                    <Select
                        id={id}
                        className={inputClassName}
                        register={register}
                        dirtyField={dirtyField}
                        errors={errors}
                        {...rest}>
                        {children}
                    </Select>
                );
            case "searchable-select":
                // console.log("asasdasd", rest.options);

                return (
                    <SearchableSelect
                        id={id}
                        placeholder={placeholder}
                        className={inputClassName}
                        register={register}
                        dirtyField={dirtyField}
                        errors={errors}
                        {...rest}
                    />
                );
            case "textarea":
                return (
                    <Textarea
                        id={id}
                        label={label}
                        placeholder={placeholder}
                        className={inputClassName}
                        errors={errors}
                        register={register}
                        dirtyField={dirtyField}
                        {...rest}
                    />
                );
            default:
                return (
                    <Input
                        id={id}
                        label={label}
                        placeholder={placeholder}
                        type={type}
                        className={inputClassName}
                        errors={errors}
                        register={register}
                        dirtyField={dirtyField}
                        prependInput={prependInput}
                        appendInput={appendInput}
                        {...rest}
                    />
                );
        }
    };

    return (
        <div className={`grid ${labelOnTop ? "" : "lg:grid-cols-3"} grid-cols-1 ${wrapperClassName}`}>
            <LabelInput
                id={id}
                label={label}
                className={`${labelOnTop ? "mb-2" : ""} ${type === "textarea" ? "mb-auto mt-3" : "my-auto"}`}
            />

            <div className="flex items-center w-full col-span-2">{InputMap()}</div>
            {/* dirtyField &&  */ errors && <span className="text-red-500 text-sm">{errors.message}</span>}
        </div>
    );
};

export default InputWithLabel;
