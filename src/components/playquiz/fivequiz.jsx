import React from 'react'
import Sixquiz from './sixquiz.jsx'
import Maths from './../../assets/Math 1.png';
import English from './../../assets/Brick.png';
import Hindi from './../../assets/Vector.png';
export default function fivequiz() {
  return (
    <div className=' flex-1 justify-between  grid grid-cols-3 w-full h-96 rounded-lg bg-slate-100 mt-1 ml-20 mr-20'>

   
            <Sixquiz Subject='Maths' img={Maths} color='bg-white-100'/>
            <Sixquiz Subject='English' img={English} color='bg-white-100'/>
            <Sixquiz Subject='Hindi' img={Hindi} color='bg-white-100'/>
            <Sixquiz Subject='G.k' img={Maths} color='bg-white-100'/>
            <Sixquiz Subject='Science' img={Maths} color='bg-white-100'/>
            <Sixquiz Subject='Moral' img={Maths} color='bg-white-100'/>
            <Sixquiz Subject='S.s.t' img={Maths} color='bg-white-100'/>
            <Sixquiz Subject='computer' img={Maths} color='bg-white-100'/>
    </div>
  )
}
