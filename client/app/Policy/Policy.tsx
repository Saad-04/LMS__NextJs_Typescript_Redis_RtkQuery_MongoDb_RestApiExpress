import React, { useEffect, useState } from 'react';
import { styles } from '../Styles/style';
import { useGetHeroDataQuery } from '../../redux/features/layouts/layoutApi';

type Props = {};

const Policy = (props: Props) => {
  const { data, refetch, isLoading, isSuccess } = useGetHeroDataQuery('privacyPolicy', {});
  const [policy, setPolicy] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setPolicy(data.layout?.privacyPolicy);
    }
  }, [data]);

  return (
    <div>
      <div className={'w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3'}>
        <h1 className={`${styles.title} !text-start pt-2 text-gradient text-purple-800`}>
          Platform Terms and Condition
        </h1>
        <ul style={{ listStyle: 'unset', marginLeft: '15px' }}>
          {policy &&
            policy.map((policy) => {
              return (
                <>
                  <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                    {policy.title}
                  </p>
                  <br />
                </>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Policy;
