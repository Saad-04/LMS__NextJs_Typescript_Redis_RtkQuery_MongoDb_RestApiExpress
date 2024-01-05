'use client ';

import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetail';
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from '../../../redux/features/orders/orderApis';
import { loadStripe } from '@stripe/stripe-js';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useGetSingleCourseQuery } from '../../../redux/features/courses/courseApi';

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleCourseQuery(id); //this weil return full single course data every thing about course
  //when this api call then we get stripeapiPublishKey only front backend
  const { data: config } = useGetStripePublishablekeyQuery({});
  // this createPaymentIntent accept amount only
  const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data && userData?.user) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [data, userData]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + ' - ELearning'}
            description={
              'ELearning is a programming community which is developed by shahriar sajeeb for helping programmers'
            }
            keywords={data?.course?.tags}
          />
          <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
