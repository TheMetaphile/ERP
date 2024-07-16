import React, { useState } from 'react';

const Ctc = ({ nextStep, prevStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [instruments, setInstruments] = useState([]);
  const [instrumentTitle, setInstrumentTitle] = useState('');
  const [instrumentAmount, setInstrumentAmount] = useState('');

  const handleAddInstrument = () => {
    if (!instrumentTitle || !instrumentAmount) {
      alert("Please fill in both fields.");
      return;
    }
    setInstruments([...instruments, { title: instrumentTitle, amount: instrumentAmount }]);
    setInstrumentTitle('');
    setInstrumentAmount('');
    setShowModal(false);
  };

  const handleRemoveInstrument = (index) => {
    setInstruments(instruments.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 border">
        <h2 className="text-2xl font-medium p-2 mobile:max-tablet:text-xl">CTC Management</h2>

        <div className="space-y-4">
          <label className="block">
            <span>Enter In hand salary</span>
            <input type="text" placeholder="Enter In hand salary" className="w-full p-2 border rounded mt-1" />
          </label>
          {/* <label className="flex items-center gap-2">
            <span>Enter instrumental</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowModal(true)} className="bg-blue-400 text-white px-2 py-1 rounded">+</button>
            </div>
          </label>
          <div className="space-y-2">
            {instruments.map((instrument, index) => (
              <div key={index} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <p>{instrument.title}</p>
                  <p>{instrument.amount}</p>
                </div>
                <button
                  onClick={() => handleRemoveInstrument(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div> */}
        </div>

        <div className="flex justify-between">
          <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">
            Back
          </button>
          <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">
            Proceed
          </button>
        </div>
      </div>

      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-xl font-normal">Add Instrument</h3>
            <label className="block">
              <span>Enter title of instrument</span>
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded mt-1"
                value={instrumentTitle}
                onChange={(e) => setInstrumentTitle(e.target.value)}
              />
            </label>
            <label className="block">
              <span>Enter amount</span>
              <input
                type="text"
                placeholder="Amount"
                className="w-full p-2 border rounded mt-1"
                value={instrumentAmount}
                onChange={(e) => setInstrumentAmount(e.target.value)}
              />
            </label>
            <div className="flex justify-between">
              <button
                onClick={handleAddInstrument}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Ctc;
