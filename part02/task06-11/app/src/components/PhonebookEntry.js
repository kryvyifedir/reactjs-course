const PhonebookEntry = ({entry}) => {

    return (
        <tr>
             <td>
                {entry.name}
            </td>
            <td>
                {entry.phone}
            </td>
        </tr>
       
    )
}

export default PhonebookEntry