import { useState, useRef, useEffect } from 'react';

export default function ProfileTableRow(props) {
    const { field, value, saveChanges } = props;
    const [editing, setEditing] = useState(false);
    const [newValue, setNewValue] = useState(value);
    const editImput = useRef();
    // TODO: validate input
    // show error
    function handleSave() {
        saveChanges(field, newValue);
        setEditing(false);
    }

    function handleEdit() {
        setEditing(true);
        setNewValue(value);
    }

    useEffect(() => {
        if (editing && editImput.current) {
            editImput.current.focus();
        }
    }, [editing])

    return (
        <tr>
            <th>{field[0].toUpperCase() + field.slice(1)}:</th>
            <td>
                {editing
                    ? <input
                        name="newValue"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onBlur={() => setEditing(false)}
                        ref={editImput}
                    />
                    : value}
            </td>
            <td>
                {
                    editing
                        ? <button onClick={handleSave} onMouseDown={(e) => e.preventDefault()}>Save</button>
                        : <button onClick={handleEdit}>Edit</button>
                }
            </td>
        </tr>

    )
}