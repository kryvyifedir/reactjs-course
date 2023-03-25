
const NewEntry = ({ nameValue, onNameChange, phoneValue, onPhoneChange, onSubmit }) => {

    return (
        <div>
            <h2>Add new:</h2>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input onChange={onNameChange} value={nameValue} />
                </div>
                <div>
                    phone: <input onChange={onPhoneChange} value={phoneValue} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default NewEntry