export default function SelectTeacher({ onSelect }) {
    const handleSubjectSelect = (selectedSubject) => {
        onSelect(selectedSubject);
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
            <h1 className="shadow-lg w-fit mt-4">Select Teacher</h1>
            <div class="grid grid-cols-2 gap-4 mt-2 py-2">

                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Anjali Mam")}>Anjali Mam</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Sakshi Mam")}>Sakshi Mam</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Abhishek Sir")}>Abhishek Sir</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Yash Sir")}>Yash Sir</div>

                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Bhanu Sir")}>Bhanu Sir</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Preeti Mam")}>Preeti Mam</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Shiva Sir")}>Shiva Sir</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Ravi Sir")}>Ravi Sir</div>
            </div>
        </div>
    )
}