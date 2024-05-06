import SubjectProgress from './SubjectProgress/subjectProgress.jsx';

export default function AllSubjectProgress() {
  return (
    <div className="flex-1 w-full  bg-teal-100 rounded-lg shadow-md p-3 overflow-y-auto no-scrollbar">
      <SubjectProgress subject='Maths' description='Chapter 6' percent={73} />
      <SubjectProgress subject='Hindi' description='Chapter 5.5' percent={63} />
      <SubjectProgress subject='English' description='Chapter 4.3' percent={43} />
      <SubjectProgress subject='Chemistry' description='Chapter 6.6' percent={83} />
      <SubjectProgress subject='Computer' description='Chapter 3.5' percent={33} />
      <SubjectProgress subject='Social' description='Chapter 4.9' percent={52} />
      <SubjectProgress subject='Sanskrit' description='Chapter 5.9' percent={78} />
      <SubjectProgress subject='Biology' description='Chapter 8' percent={95} />
      <SubjectProgress subject='Physics' description='Chapter 3' percent={25} />
      <SubjectProgress subject='Biology' description='Chapter 8' percent={95} />
    </div>
  );
}
