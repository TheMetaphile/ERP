import Info from "./info.jsx"
import info  from './../../assets/Test Account.png';
import ClassAttend from "./ClassAttend.jsx";
export default function Performance(props) {
  return (
    <div className={`  flex-1 border-2 border-solid border-grey w-5/6  mb-6 h-3/5 p-4 shadow-md  mt-3 rounded-lg  mr-3  ml-4`}>
        <div className=" flex items-center mt-2  ml-20 item-center">

        <img src={props.img}alt={props.img} className="w-14 h-12 ml-14 justify-between "/>   

         <span className=" justify-between  flex ml-8  text-[24px] text-pink-500 text-xl"> {props.name}</span>
         </div>
           <p className="text-center ml-16 flex-row text-xs">{props.address}</p>
   
      <div className=" border-2 border-red-200 mt-3"></div> 

   <Info img={info} />
   <ClassAttend heading="ATTENDANCE"/>
  
</div>

   
  )
}
