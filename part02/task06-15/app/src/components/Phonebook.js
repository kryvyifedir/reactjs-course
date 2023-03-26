
import PhonebookEntry from './PhonebookEntry';

const Phonebook = ({ entries, removeFunction }) => {

    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{entries.map(entry => 
                    <PhonebookEntry key={entry.id} entry={entry} onClick={removeFunction}/>)
                }</tbody>
            </table>
        </div>
    )
}

export default Phonebook