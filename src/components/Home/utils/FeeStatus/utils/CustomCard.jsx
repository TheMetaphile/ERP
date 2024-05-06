export default function FeeCard(props) {
    return (
      <div className="w-52 mobile:max-tablet:w-fit  mx-auto shadow-md rounded-lg bg-white p-4 text-center">
        <img src={props.img} alt="img" className="w-16 h-16 mx-auto" />
        <h2 className="font-medium">₹ {props.amount}</h2>
        <h3 className="text-gray-500">{props.title}</h3>
      </div>
    );
  }
  