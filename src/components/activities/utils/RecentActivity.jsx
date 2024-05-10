import React from 'react'
import RecentActivityTile from './RecentActivityTile'
import pic1 from '../../../assets/art-and-design 1.png'
import pic2 from '../../../assets/dance.png'
import pic3 from '../../../assets/writing.png'
import pic4 from '../../../assets/pool.png'

export default function RecentActivity() {
    return (
        <div className='ml-3 mr-3 grid mobile:max-laptop:grid-cols-2 laptop:grid-cols-4 gap-3'>
            <RecentActivityTile bg='bg-green-200' img={pic1} description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024'/>
            <RecentActivityTile bg='bg-blue-200' img={pic2} description='Your Fest will be held on 13 March.' date='12 March 2024'/>
            <RecentActivityTile bg='bg-yellow-200' img={pic3} description='Scool is Organizing Writing Competition on 24 March.' date='22 March 2024'/>
            <RecentActivityTile bg='bg-pink-200' img={pic4} description='There is a Poolparty at Next week.' date='27 March 2024'/>
            <RecentActivityTile bg='bg-blue-300' description='More Activities coming soon.'/>

        </div>
    )
}

