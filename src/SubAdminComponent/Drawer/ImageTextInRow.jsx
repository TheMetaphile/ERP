import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
export default function ImageTextInRow(props) {
    return (
        <Link to={props.route} className="flex px-2 py-2 mt-3 rounded-full  items-start text-black text-sm no-underline hover:bg-bg_blue">
            <IoIosArrowForward className='w-5 h-5' />
            <span className="ml-2">{props.text}</span>
        </Link>
    );
}
