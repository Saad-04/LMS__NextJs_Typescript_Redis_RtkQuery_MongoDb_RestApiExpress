import React, { FC, useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
  data: any; //this data is course.courseData
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());

  // Find unique video sections
  //this will return the name of all sections e.g (3) ['frontend', 'backend', 'payment section']
  const allVideoSections: string[] = [...new Set<string>(props.data?.map((item: any) => item.videoSection))]; //this will return the name of all sections e.g (3) ['frontend', 'backend', 'payment section']

  let totalCount: number = 0; // Total count of videos from previous sections

  // this toggle section is for when we hide then section when click on this icon '^' and this section is a the single name of section i mean like 'frontend', 'backend', ' devops' etc.. and this section everytime change because this was in loop using map method
  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };
  //
  // useEffect(() => {
  //   console.log(allVideoSections);
  //   console.log('setVisibleSection :', visibleSections);
  // }, [allVideoSections, visibleSections]);

  return (
    // <></>?
    <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
      {/* map method  */}
      {allVideoSections.map(
        //here we run loop on the name of sections which available in array like ['frontend','backend','devops']
        (section: string, sectionIndex: number) => {
          //
          // here we check if any section name of videoSection array[frontend,backend,devops] are availble in setVisisbleSection useState array then
          const isSectionVisible = visibleSections.has(section); //they check all section of visible section array and then matched it to videoSection array if mathced then return true
          //
          // Filter videos by section
          //here we filter all videos by its section wise separately i mean  frontend video in frontend section array and backend video in frontend section array
          const videosSectionWise: any[] = props.data.filter((item: any) => item.videoSection === section);
          //
          const sectionVideoCount: number = videosSectionWise.length; // Number of videos in the current section
          //this reduce method will return the length of all videos on same section wise i mean sum of frontend section videos length combine and backend separately combine
          const sectionVideoLength: number = videosSectionWise.reduce(
            (totalLength: number, item: any) => totalLength + item.videoLength,
            0
          );
          // here we show the hours of course video in hours to divide with 60
          const sectionContentHours: number = sectionVideoLength / 60;
          //
          // totalcount come from up
          const sectionStartIndex: number = totalCount; // Start index of videos within the current section
          // this total was increase until its equal to videosSectionWise.length and this totalcount everytime increase when map() method goes to next item one by one
          totalCount += sectionVideoCount; // Update the total count of videos

          return (
            //this div in loop using map method
            <div
              className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`}
              key={section}>
              {/*---  ----*/}
              <div className="w-full flex">
                {/* Render video section */}
                <div className="w-full flex justify-between items-center">
                  <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                  <button
                    className="mr-4 cursor-pointer text-black dark:text-white"
                    //this section name everytime change when map method called and goes to next item of array section = 'frontend' etc... i mean name
                    onClick={() => toggleSection(section)}>
                    {isSectionVisible ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                  </button>
                </div>
              </div>
              {/* -------- show time and nunber of videos in each section*/}
              <h5 className="text-black dark:text-white">
                {sectionVideoCount} Lessons ·{' '}
                {/* if video length lessthan 60 then show as it is time otherwise show in hours  */}
                {sectionVideoLength < 60 ? sectionVideoLength : sectionContentHours.toFixed(2)}{' '}
                {sectionVideoLength > 60 ? 'hours' : 'minutes'}
              </h5>
              <br />
              {isSectionVisible && (
                <div className="w-full">
                  {videosSectionWise.map((item: any, index: number) => {
                    const videoIndex: number = sectionStartIndex + index; // Calculate the video index within the overall list
                    const contentLength: number = item.videoLength / 60;
                    return (
                      <div
                        className={`w-full ${
                          videoIndex === props.activeVideo ? 'bg-slate-800' : ''
                        } cursor-pointer transition-all p-2`}
                        key={item._id}
                        onClick={() => (props.isDemo ? null : props?.setActiveVideo(videoIndex))}>
                        <div className="flex items-start">
                          <div>
                            <MdOutlineOndemandVideo size={25} className="mr-2" color="#1cdada" />
                          </div>
                          <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                            {item.title}
                          </h1>
                        </div>
                        <h5 className="pl-8 text-black dark:text-white">
                          {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength}{' '}
                          {item.videoLength > 60 ? 'hours' : 'minutes'}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
        // /
      )}
    </div>
  );
};

export default CourseContentList;
