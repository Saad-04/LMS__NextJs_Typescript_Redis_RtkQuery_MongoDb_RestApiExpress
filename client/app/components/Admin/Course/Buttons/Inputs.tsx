import React, { FC } from 'react';
import { styles } from '../../../../../app/Styles/style';

interface Props {
  title: string;
  courseContentData: array;
  index: number;
}

const InputName: FC<Props> = ({ title, courseContentData, index }) => {
  return (
    <>
      {' '}
      <input
        type="text"
        placeholder="Project Plan..."
        className={`${styles.input}`}
        value={title}
        onChange={(e) => {
          const updatedData = [courseContentData];
          updatedData[index].title = e.target.value;
          setCourseContentData(updatedData);
        }}
      />
    </>
  );
};

export { InputName };
