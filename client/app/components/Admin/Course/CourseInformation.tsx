import { styles } from '../../../../app/Styles/style';
// import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const [dragging, setDragging] = useState(false); //this for draging the image
  // const { data } = useGetHeroDataQuery('Categories', {});
  const [categories, setCategories] = useState([
    { title: 'machine Learning', _id: 0 },
    { title: 'web programming', _id: 0 },
  ]);

  // useEffect(() => {
  //   if (data) {
  //     setCategories(data.layout.categories);
  //   }
  // }, [data]);

  //this call on end when click on next page
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form
        onSubmit={handleSubmit}
        className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white `}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
            id="name"
            placeholder="course name"
            className={`
            ${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white`}>
            Course Description
          </label>
          <textarea
            name="description"
            id=""
            cols={30}
            rows={8}
            placeholder="Write about your course..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            //updte set course object data which was created in createCourse page
            onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}></textarea>
        </div>

        <div className="w-full flex justify-center items-left gap-3 800px:gap-0 800px:justify-between flex-col 800px:flex-row">
          <div className="800px:w-[45%]">
            <label className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white`}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              //updte set course object data which was created in createCourse page
              onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
              id="price"
              placeholder="29"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="800px:w-[50%]">
            <label className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white w-[50%] `}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              //updte set course object data which was created in createCourse page
              onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
              id="price"
              placeholder="79"
              className={`
            ${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-center items-left 800px:justify-between flex-col 800px:flex-row gap-3 800px:gap-0 ">
          <div className="800px:w-[45%]">
            <label className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white`} htmlFor="email">
              Course Tags
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              //updte set course object data which was created in createCourse page
              onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
              id="tags"
              placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="800px:w-[45%]">
            <label className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white w-[50%]`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className={`${styles.input}`}
              value={courseInfo.category}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, categories: e.target.value })}>
              <option value="">Select Category</option>
              {categories &&
                categories.map((item: any) => (
                  <option value={item.title} key={item._id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-center items-left 800px:justify-between flex-col 800px:flex-row gap-3 800px:gap-0 ">
          <div className="w-[45%]">
            <label className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white flex flex-nowrap`}>
              Course Level
            </label>
            <input
              type="text"
              name=""
              value={courseInfo.level}
              required
              onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`text-[14px] 800px:text-[16px] font-Poppins text-black dark:text-white w-[50%]`}>
              Demo Url
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
              id="demoUrl"
              placeholder="eer74fd"
              className={`
            ${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input type="file" accept="image/*" id="file" className="hidden" onChange={handleFileChange} />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver} //this return true
            onDragLeave={handleDragLeave} //this return false
            //this return false
            onDrop={handleDrop}>
            {courseInfo.thumbnail ? (
              <img src={courseInfo.thumbnail} alt="thumbnail" className="max-h-full w-full object-cover" />
            ) : (
              <span className="text-black dark:text-white">Drag and drop your thumbnail </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
