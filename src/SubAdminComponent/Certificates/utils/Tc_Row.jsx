export default function TCRow({ no, detail, detail2 ,label, field1,field2, handleChange,editing}) {
    console.log(editing, "editiinf");
    const onchange = (field,value)=>{
        handleChange(field,value);
    }
    return (
        <div className={`flex w-full border-b-2 py-3 px-4 ${ editing ? "text-xl" : "text-2xl"}`}>
            <label className="w-2/3 font-medium text-gray-700">{no}.&nbsp;&nbsp;{label}&nbsp;</label>
            :&nbsp;{
                editing
                ? 
                <div className="flex">
                    <input type="text" className=" px-2 rounded-md border-b border-gray-300" value={detail} onChange={(e) => onchange(field1,e.target.value)} />
                    {
                        detail2 ? 
                    <input type="text" className=" px-2 rounded-md border-b border-gray-300" value={detail2} onChange={(e) => onchange(field2,e.target.value)} />
                    :
                    <></>
                    }
                </div>
                 :
                 (
                 <div>
                    <span className="w-auto font-normal ">  {detail}&nbsp;</span>
                    <span className="w-auto font-normal ">{detail2}</span>

                 </div>

                 )
                 
                 
                 }
                 
        </div>
    )
}