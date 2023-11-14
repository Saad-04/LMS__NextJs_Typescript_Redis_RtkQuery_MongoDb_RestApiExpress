// Import necessary modules and components
import { type } from 'os'; // Unused import
import { styles } from '../../Styles/style'; // Importing styles
import React, { FC, useRef, useState } from 'react'; // Importing React and related dependencies
import { VscWorkspaceTrusted } from 'react-icons/vsc'; // Importing an icon component
import { useActivationMutation } from '@/redux/features/auth/authApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

// Define a custom type for props that this component expects
type Props = {
  setRoute: (route: string) => void; // Expecting a function prop called setRoute
};

// Define a custom type for the verification code object
type VerifyNumber = {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
};

// Create the Verification component as a functional component
const Verification: FC<Props> = ({ setRoute }) => {
  // Define state variables
  const { token } = useSelector((state: any) => {
    return state.auth;
  });
  const [activation, { isLoading, isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false); // Error state
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: '',
    1: '',
    2: '',
    3: '',
  }); // Object to store the verification code

  useEffect(() => {
    // if (isLoading && !isSuccess) {
    //   toast.success('please wait...');
    //   setRoute('Loader');
    // }
    if (isSuccess) {
      setRoute('Login');
      toast.success('Account activated successfully');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log('An error occured:', error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]; // An array of refs to input elements for focus management

  // Function to handle input changes
  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false); // Reset error state
    const newVerifyNumber = { ...verifyNumber, [index]: value }; // Update the verification code
    setVerifyNumber(newVerifyNumber);

    if (value === '' && index > 0) {
      // If input is empty and not the first field, shift focus to the previous field
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      // If input has one character and not the last field, shift focus to the next field
      inputRefs[index + 1].current?.focus();
    }
  };

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join('');

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_Token: token,
      activation_Code: verificationNumber,
    });
  };

  // Render the component's UI
  return (
    <div className="">
      <h1 className={`${styles.title}`}>Verify Your Account</h1> {/* Display a title */}
      <br />
      <div className="w-full flex items-center justify-center mt-1">
        <div className="w-[60px] h-[60px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={30} /> {/* Display an icon */}
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[50px] h-[50px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError ? 'shake border-red-500' : 'dark:border-white border-[#0000004a]'
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-3 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in?{' '}
        <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute('Login')}>
          Sign in
        </span>
      </h5>
    </div>
  );
};

// Export the Verification component as the default export of this module
export default Verification;
