'use client';
import { FC, useState } from 'react';
import Header from './components/Header';
import Heading from './utils/Heading';
import Hero from './components/Routes/Hero';

interface Props {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <Header
        open={open} //this open is for login signup form
        setOpen={setOpen} //this open is for login signup etc form
        activeItem={activeItem} //this is nav header item index like home, about etc
        setRoute={setRoute}
        route={route}
      />
      <Hero />

      {/* <Courses />
      <Reviews />
      <FAQ />
      <Footer /> */}
    </div>
  );
};
export default Page;
