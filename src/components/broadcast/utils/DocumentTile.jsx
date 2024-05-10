import pdf from '../../../assets/pdf.png'
import download from '../../../assets/Download.png'

export default function DocumentTile(props) {
    return (
        <div className=" w-11/12 m-auto mt-3  flex items-center rounded-lg shadow-md mb-3 justify-between">
            <div className='flex items-center'>
            <img src={pdf} alt="" className=' mr-3 ml-2 h-10 w-10'></img>
            <div className='px-2 py-2'>
                <h1 className='text-base'>{props.topic}</h1>
                <h1 className='text-sm'>{props.description}</h1>
                <h1 className='text-xs'>{props.size}</h1>
            </div>
            </div>
            <img src={download} alt="" className='px-2'></img>
        </div>
    )
}

