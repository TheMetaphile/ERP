import Logo from '../../../assets/Test Account.png'
import { IoLogoWhatsapp } from "react-icons/io";

export default function StudentTile(props) {
    return (
        <div className=" w-full border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
            <div className='flex'>
                <img src={Logo} alt="" className='h-12'></img>
                <div className='ml-2'>
                    <div className='flex gap-2 font-normal'>
                        <span>{props.name}</span>|
                        <span>Class : {props.class}</span>|
                        <span>Birthday : {props.birthday}</span>

                    </div>
                    <div className="mt-1 font-medium text-base">{props.message} {props.name} ...</div>
                </div>
            </div>
            <div className='flex items-center bg-green-800 text-white p-3 gap-1 rounded-lg shadow-md '>
                <IoLogoWhatsapp className='text-green-600' />
                <span>Meassage</span>
            </div>

        </div>
    )
}

