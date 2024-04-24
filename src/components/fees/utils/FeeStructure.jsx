import Header from './feestructureheader.jsx';
import FeeStructureField from './feeStructureField.jsx';
import FeeStructureFooter from './feeStructureFooter';

export default function FeeStructure() {
    return (
        <div className="w-full h-screen mb-4 bg-white rounded-lg shadow-md ">
            <Header />
            <FeeStructureField sn='01' particular='Tuition Fee' amount='Rs. 5,000' />
            <FeeStructureField sn='02' particular='Book Bank' amount='Rs. 2,000' />
            <FeeStructureField sn='03' particular='Dress' amount='Rs. 1,500' />
            <FeeStructureField sn='04' particular='Exam Fee' amount='Rs. 1,000' />
            <FeeStructureField sn='05' particular='Misc. Fee' amount='Rs. 500' />
            <FeeStructureFooter />
        </div>
    );
}
