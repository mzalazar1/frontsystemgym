const SocInput = ({ register, type, placeholder, value, name, rules, onChange }) => {
    return (
        <input {...register(`${name}`, rules)} type={type} value={value} onChange={onChange} placeholder={placeholder} name={name} >
        </input>
    )
}

export default SocInput;

