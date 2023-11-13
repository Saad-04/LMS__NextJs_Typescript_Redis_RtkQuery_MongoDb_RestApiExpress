import React, { FC, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { styles } from '../../Styles/style';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Please enter your name!'),
  email: Yup.string().email('Invalid email!').required('Please enter your email!'),
  password: Yup.string().required('Please enter your password!').min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false); //this for hide and show the password
  const [register, { isSuccess, error, data }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'regitered successfully';
      toast.success(message);
      setRoute('Verification');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Sigh-Up Now </h1>

      <form onSubmit={handleSubmit}>
        {/*  */}
        {/* name section  */}
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Name
          </label>
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="enter your name "
            className={`${errors.name && touched.name && 'border-red-500'} ${styles.input}`}
          />
          {errors.name && touched.name && <span className="text-red-500 pt-2 block">{errors.name}</span>}
        </div>

        {/* email section  */}
        <label className={`${styles.label}`} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email address"
          className={`${errors.email && touched.email && 'border-red-500'} ${styles.input}`}
        />
        {/* when email is wronge then show this text  */}
        {errors.email && touched.email && <span className="text-red-500 pt-2 block">{errors.email}</span>}

        {/* password section  */}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your password
          </label>
          <input
            type={!show ? 'password' : 'text'}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your password"
            className={`${errors.password && touched.password && 'border-red-500'} ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 dark:text-white right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {/* when password is wronge then show this text  */}
          {errors.password && touched.password && <span className="text-red-500 pt-2 block">{errors.password}</span>}
        </div>

        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>

        <br />

        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">Or join with</h5>

        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            // onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2"
            // onClick={() => signIn("github")}
          />
        </div>

        <h5 className="text-center pt-3 font-Poppins dark:text-white text-[11px]">
          If alread have an account?{' '}
          <span className="text-[#2190ff] text-[13px] pl-1 cursor-pointer" onClick={() => setRoute('Login')}>
            Login Now
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
