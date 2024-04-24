import FeeCard from './utils/CustomCard.jsx';
import Payable from './../../../../assets/coins.png';
import Paid from './../../../../assets/paid.png';
import Pending from './../../../../assets/pending.png';

export default function FeeStatus() {
  return (
    <div className='flex w-full justify-between shadow-md rounded-lg bg-teal-100 p-4'>
      <FeeCard img={Payable} amount={10000} title='Total Payable' />
      <FeeCard img={Paid} amount={10000} title='Total Paid' />
      <FeeCard img={Pending} amount={10000} title='Pending' />
    </div>
  );
}
