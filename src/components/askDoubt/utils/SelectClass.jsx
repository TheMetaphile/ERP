export default function SelectClass({ onSelect }) {
    const handleClassSelect = (selectedClass) => {
        onSelect(selectedClass);
    };

    const styles = {
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        textAlign: 'center',
        borderRadius: '0.5rem',
        cursor: 'pointer',
    };
    return (
        <div className=" rounded-lg shadow-md">
            <h1 className="shadow-lg  w-fit mt-4">Select Class</h1>
            <div class="grid grid-cols-4 gap-4 mt-2 py-2">

                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleClassSelect("1")}>1st</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleClassSelect("2")}>2nd</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleClassSelect("3")}>3rd</div>
                <div style={styles} class="  hover:bg-purple-400" onClick={() => handleClassSelect("4")}>4th</div>

                <div style={styles} class=" hover:bg-purple-400 " onClick={() => handleClassSelect("5")}>5th</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleClassSelect("6")}>6th</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleClassSelect("7")}>7th</div>
                <div style={styles} class=" hover:bg-purple-400 " onClick={() => handleClassSelect("8")}>8th</div>

                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleClassSelect("9")}>9th</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleClassSelect("10")}>10th</div>
                <div style={styles} class=" hover:bg-purple-400 " onClick={() => handleClassSelect("11")}>11th</div>
                <div style={styles} class=" hover:bg-blue-300 " onClick={() => handleClassSelect("12")}>12th</div>
                <br></br>
            </div>
        </div>
    )
}