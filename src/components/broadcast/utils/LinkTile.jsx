import logo from '../../../assets/metaphile_logo.png'


export default function LinkTile(props) {
    return (
        <div className="w-11/12 m-auto mt-3  flex items-center rounded-lg shadow-md mb-3">
            <img src={logo} alt="" className='h-10 px-3'></img>
            <div className='px-2 py-2'>
                <h1 className='text-base'>{props.topic}</h1>
                <h1 className='text-sm'>{props.description}</h1>
                <h1 className='text-xs'>{props.size}</h1>
            </div>

        </div>
    )
}

