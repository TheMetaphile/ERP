import React from "react";

const AdmissionInputs = ({ stream, formData, handleChange }) => {
  const renderSubjectInputs = () => {
    switch (stream) {
      case "PCM":
        return (
          <>
            <div className=" mobile:max-tablet:flex gap-20 overflow-auto">
              <div className="w-full rounded-md mobile:max-tablet:flex items-center">
                <label className="block text-lg mb-2 mobile:max-tablet:mb-0" htmlFor="physics">
                  Physics
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="physics"
                    type="text"
                    name="physics"
                    placeholder="Physics"
                    value={formData.physics}
                    onChange={handleChange}
                    required
                  />
                </label>

              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="chemistry">
                  Chemistry
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="chemistry"
                    type="text"
                    name="chemistry"
                    placeholder="Chemisty"
                    value={formData.chemistry}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="maths">
                  Maths
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="maths"
                    type="text"
                    name="maths"
                    placeholder="Maths"
                    value={formData.maths}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="subject4">
                  English
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="english"
                    type="text"
                    name="english"
                    placeholder="English"
                    value={formData.english}
                    onChange={handleChange}
                    required
                  />
                    
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="optionalSubject">
                  Optional Subject
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="optionalSubject"
                    name="optionalSubject"
                    value={formData.optionalSubject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Optional Subject</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                    <option value="Economics">Hindi</option>
                  </select>
                </label>
              </div>
            </div>
          </>
        );
      case "PCB":
        return (
          <>
            <div className=" mobile:max-tablet:flex gap-20 overflow-auto">
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="physics">
                  Physics
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="physics"
                    type="text"
                    name="physics"
                    placeholder="Physics"
                    defaultValue="Physics"
                    value={formData.physics}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="chemistry">
                  Chemistry
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="chemistry"
                    type="text"
                    name="chemistry"
                    placeholder="Chemistry"
                    value={formData.chemistry}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="biology">
                  Biology
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="biology"
                    type="text"
                    name="biology"
                    placeholder="Biology"
                    value={formData.biology}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="subject4">
                  English
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="subject4"
                    name="subject4"
                    value={formData.subject4}
                    onChange={handleChange}
                    required
                  >

                    <option value="English">English</option>

                  </select>
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="optionalSubject">
                  Optional Subject
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="optionalSubject"
                    name="optionalSubject"
                    value={formData.optionalSubject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Optional Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Phyical Education">Phyical Education</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </label>
              </div>
            </div>
          </>
        );
      case "PCMB":
        return (
          <>
            <div className=" mobile:max-tablet:flex gap-20 overflow-auto">
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="physics">
                  Physics
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="physics"
                    type="text"
                    name="physics"
                    placeholder="Physics"
                    value={formData.physics}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="chemistry">
                  Chemistry
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="chemistry"
                    type="text"
                    name="chemistry"
                    placeholder="Chemistry"
                    value={formData.chemistry}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="maths">
                  Maths
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="maths"
                    type="text"
                    name="maths"
                    placeholder="Maths"
                    value={formData.maths}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="biology">
                  Biology
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="biology"
                    type="text"
                    name="biology"
                    placeholder="Biology"
                    value={formData.biology}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="subject4">
                  English
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="subject4"
                    name="subject4"
                    placeholder="English"
                    value={formData.subject4}
                    onChange={handleChange}
                    required
                  >
                    <option value="English">English</option>
                  </select>
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="optionalSubject">
                  Optional Subject
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="optionalSubject"
                    name="optionalSubject"
                    value={formData.optionalSubject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Optional Subject</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                    <option value="Economics">Hindi</option>
                  </select>
                </label>
              </div>
            </div>
          </>
        );
      case "Commerce":
        return (
          <>
            <div className=" mobile:max-tablet:flex gap-20 overflow-auto">
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="accountancy">
                  Accountancy
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="accountancy"
                    type="text"
                    name="accountancy"
                    placeholder="Accountancy"
                    value={formData.accountancy}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="businessStudies">
                  Business Studies
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="businessStudies"
                    type="text"
                    name="businessStudies"
                    placeholder="Business Studies"
                    value={formData.businessStudies}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="economics">
                  Economics
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="economics"
                    type="text"
                    name="economics"
                    placeholder=" Economics"
                    value={formData.economics}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="subject4">
                  English
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="subject4"
                    name="subject4"
                    value={formData.subject4}
                    onChange={handleChange}
                    required
                  >

                    <option value="English">English</option>

                  </select>
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="optionalSubject">
                  Optional Subject
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="optionalSubject"
                    name="optionalSubject"
                    value={formData.optionalSubject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Optional Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Physical Education">Physical Education</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </label>
              </div>
            </div>
          </>

        );
      case "Arts":
        return (
          <>
            <div className=" mobile:max-tablet:flex gap-20 overflow-auto">
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="history">
                  History
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="history"
                    type="text"
                    name="history"
                    placeholder="History"
                    value={formData.history}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="politicalScience">
                  Political Science
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="politicalScience"
                    type="text"
                    name="politicalScience"
                    placeholder="Political Science"
                    value={formData.politicalScience}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="geography">
                  Geography
                  <input
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="geography"
                    type="text"
                    name="geography"
                    placeholder="Geography"
                    value={formData.geography}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="subject4">
                  English
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="subject4"
                    name="subject4"
                    value={formData.subject4}
                    onChange={handleChange}
                    required
                  >

                    <option value="English">English</option>

                  </select>
                </label>
              </div>
              <div className="w-full rounded-md">
                <label className="block text-lg mb-2" htmlFor="optionalSubject">
                  Optional Subject
                  <select
                    className="border rounded-md w-full py-2 px-3 text-gray-500 focus:outline-none focus:shadow-outline mt-2"
                    id="optionalSubject"
                    name="optionalSubject"
                    value={formData.optionalSubject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Optional Subject</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Sociology">Sociology</option>
                    <option value="Physical Education">Physical Education</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </label>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return <div>{renderSubjectInputs()}</div>;
};

export default AdmissionInputs;
