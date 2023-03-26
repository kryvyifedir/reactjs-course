const PhonebookEntry = ({entry, onClick}) => {

    return (
        <tr>
             <td>
                {entry.name}
            </td>
            <td>
                {entry.phone}
            </td>
            <td>
                <button onClick={() => onClick(entry.id)}>delete</button>
            </td>
        </tr>
       
    )
}

export default PhonebookEntry