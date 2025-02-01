import DoughnutChart from "../../../components/Home/utils/AttendanceCard/PieChart";

export default function TotalStudentTile(){
    const data = {
        labels: [
          'Girls',
          'Boys'
        ],
        datasets: [{
          label: 'Count',
          data: [610, 410],
          backgroundColor: [
            '#7BD850',
            '#EB3232',
            
          ],
          bg: ['text-orange-600', 'text-green-600', ],
          hoverOffset: 4,
          cutout: "80%",
          borderRadius: 30,
          borderColor: "transparent"
        }]
      };
    return(
            <DoughnutChart chartData={data} title='Students' />
    )

}