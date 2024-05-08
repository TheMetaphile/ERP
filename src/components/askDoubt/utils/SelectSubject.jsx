export default function SelectSubject({ onSelect }) {
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
            <h1 className="shadow-lg w-fit mt-4">Select Subject</h1>
            <div class="grid grid-cols-2 gap-4 mt-2">

                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Hindi")}>Hindi</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Math")}>Math</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("English")}>English</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Computer")}>Computer</div>

                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Science")}>Science</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Chemistry")}>Chemistry</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Physics")}>Physics</div>
                <div style={styles} class="  hover:bg-purple-400 " onClick={() => handleSubjectSelect("Sanskrit")}>Sanskrit</div>

            </div>
        </div>
    )
}