import { styles } from '../../../../app/Styles/style';
import React, { FC } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {
  // when user start typing in input taq
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits]; //store full array data in variadble
    updatedBenefits[index].title = value; //this line  find input taq using index like benefits[0],benefits[2]
    setBenefits(updatedBenefits); //here we update the benefits array
  };

  // this fucntion add more inputs
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: '' }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites]; //store full array data in variadble
    updatedPrerequisites[index].title = value; //this line  find input taq using index like benefits[0],benefits[2]
    setPrerequisites(updatedPrerequisites); //here we update the benefits array
  };

  // this fucntion add more inputs
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: '' }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    // first we check the last input tag have value or not with benefits[benefits.length - 1] this return the last item of array
    if (benefits[benefits.length - 1]?.title !== '' && prerequisites[prerequisites.length - 1]?.title !== '') {
      setActive(active + 1);
    } else {
      toast.error('Please fill the fields for go to next!');
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)} //every input have their own index and value
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: '10px 0px', color: `white`, backgroundolor: '#37a39a', cursor: 'pointer', width: '30px' }}
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${styles.input} my-2`}
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: '10px 0px', color: `white`, backgroundolor: '#37a39a', cursor: 'pointer', width: '30px' }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}>
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}>
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
