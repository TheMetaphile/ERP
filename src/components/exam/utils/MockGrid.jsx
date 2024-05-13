import MockTile from "./MockTile";

export default function MockGrid({ showAll }){
    const mock = [
        { completed: "40%", subject: 'Physics' },
        { completed: "40%", subject: 'Math' },
        { completed: "0%", subject: 'English' },
        { completed: "0%", subject: 'Computer' },
        { completed: "0%", subject: 'Chemistry' },
        { completed: "0%", subject: 'Hindi' },
        { completed: "0%", subject: 'Social Science' }
      ];
    return (
        <div className="  grid grid-cols-4 mobile:max-laptop:grid-cols-2 gap-2 p-3 w-full">
        {mock.slice(0, showAll ? mock.length : 4).map((test, index) => (
          <MockTile key={index} completed={test.completed} subject={test.subject} />
        ))}
      </div>
    )
}