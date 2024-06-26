import React from 'react'

function Selection() {
  return (
    <div className="w-fit flex items-center gap-2">
      <select id="class" className="w-full px-4 py-2 border rounded-md">
        <option value="">Search by Class</option>
        <option value="Pre-Nursery">Pre-Nursery</option>
        <option value="Nursery">Nursery</option>
        <option value="L.K.J">L.K.J</option>
        <option value="U.K.J">U.K.J</option>
        <option value="1st">1st</option>
        <option value="2nd">2nd</option>
        <option value="3rd">3rd</option>
        <option value="4th">4th</option>
        <option value="5th">5th</option>
        <option value="6th">6th</option>
        <option value="7th">7th</option>
        <option value="8th">8th</option>
        <option value="9th">9th</option>
        <option value="10th">10th</option>
        <option value="11th">11th</option>
        <option value="12th">12th</option>
      </select>

      <select id="section" className="w-full px-4 py-2 border rounded-md">
        <option value="">Search by Section</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>

      </select>
      <select className="w-full px-4 py-2 border rounded-md">
        <option value="">Select Session</option>
        <option value="2023-24">2023-24</option>
        <option value="2024-25">2024-25</option>
      </select>
    </div>
  )
}

export default Selection