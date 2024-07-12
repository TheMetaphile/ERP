export default function FeeCard(props) {
  return (
    <div className="w-52 mobile:max-tablet:w-fit border border-gray-300  mx-auto shadow-md rounded-lg bg-white p-4 text-center  mobile:max-tablet:gap-4  mobile:max-tablet:flex   mobile:max-tablet:flex-1  mobile:max-tablet:flex-col">
      <img src={props.img} alt="img" className="w-16 h-16 mobile:max-tablet:h-10 mobile:max-tablet:w-10 mx-auto" />
      <h2 className="font-medium  mobile:max-tablet:text-sm">₹ {props.amount}</h2>
      <h3 className="text-gray-500 ">{props.title}</h3>
    </div>
  );
}
