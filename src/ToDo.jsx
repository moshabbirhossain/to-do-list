import { useEffect, useState } from "react";
let nextId = 0;
//getItem(key) from localStorage
const getLocalItems = () =>{
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
};
const ToDo = () => {
    const [data, setData] = useState("");
    const [saveData, setSaveData] = useState(getLocalItems());
    const [editData, setEditData] = useState(null);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (editData !== null) {
            // Update existing item
            setSaveData(saveData.map(item => item.id === editData ? { ...item, name: data } : item));
            setEditData(null);
        } else {
            // Add new item
            setSaveData([...saveData, { id: nextId++, name: data }]);
        }
        setData("");
    };

    const editHandler = (id) => {
        const itemToEdit = saveData.find(item => item.id === id);
        setData(itemToEdit.name);
        setEditData(id);
    };
    // setItem(key) to localStorage 
    useEffect(() =>{
        localStorage.setItem('lists', JSON.stringify(saveData))
    },[saveData]);
    return (
        <div className="rounded-2xl w-fit bg-orange-600 mx-auto my-10 p-4">
            <form onSubmit={handleSubmit} className="text-center mb-4 w-full flex flex-col items-center justify-center">
                <h1 className="text-xl font-semibold mb-2 text-white">To-Do List</h1>
                <div className="flex w-full items-center justify-center">
                <input
                    type="text"
                    required
                    onChange={(e) => setData(e.target.value)}
                    value={data}
                    className="border-solid w-full border-2 border-r-0 rounded-l-xl outline-none pl-4 py-2 bg-white"
                    placeholder="Enter Your To-Do Task"
                />
                <button
                    type="submit"
                    className="border-solid border-2 border-l-0 rounded-r-xl outline-none px-6 py-2 font-bold bg-white">
                    {editData !== null ? "Update" : "Enter"}
                </button>
                </div>
            </form>
            {
                saveData.map((item) => (
                    <table key={item.id} className="flex items-center w-full justify-center mb-4 rounded-lg bg-white">
                        <tbody>
                            <tr className="flex gap-4 items-center pr-2 py-2">
                                <td>
                                    <p className="border-solid border-0  rounded-lg pl-2 w-24 md:w-36 lg:w-36 break-words bg-white font-semibold">
                                        {item.name}
                                    </p>
                                </td>
                                <td>
                                    <button className="btn btn-secondary w-20" onClick={() => editHandler(item.id)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-error w-20 text-white"
                                        onClick={() => setSaveData(saveData.filter(a => a.id !== item.id))}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))
            }
        </div>
    );
};

export default ToDo;