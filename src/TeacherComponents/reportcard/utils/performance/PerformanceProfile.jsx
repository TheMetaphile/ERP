import { useParams } from "react-router-dom";
import InfoCard from "../../../../components/Result/utils/InfoCard";
import profile from '../../../../assets/Test Account.png';
import Attendance from "./Attendence";
import Academic from "./Academic";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PerformanceProfile() {
  const { id } = useParams();

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    const clone = input.cloneNode(true);
    
    // Apply grayscale filter to the clone to remove colors
    clone.style.filter = "grayscale(100%)";
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    document.body.appendChild(clone);

    html2canvas(clone, {
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      document.body.removeChild(clone); // Clean up the clone
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('download.pdf');
    });
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar" id="divToPrint">
      <h3 className="text-xl font-medium">Performance Profile</h3>
      <InfoCard 
        class="2nd A" 
        name={id} 
        profileImg={profile}
        rollnumber="2001270100028"
        dob="27 Dec 1995"
        bloodgroup="B+"
        contactno="+91 8979020025"
        father="Mr. Raj kumar Tyagi"
        mother="Mrs. Manju Tyagi"
      />
      <Attendance term={[{ total: "249", attendance: "235" }]} />
      <Academic />
      <div className="text-xl font-medium my-3 bg-secondary text-black self-center rounded-lg shadow-md py-1 px-3 mt-3 hover:bg-blue-400 cursor-pointer hover:text-white" onClick={printDocument}>
        Download
      </div>
    </div>
  );
}
