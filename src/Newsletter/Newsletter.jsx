import { Banner, Button, Label, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from '../config';
import axios from 'axios';

const Newsletter = () => {
  const handalNewsLater = async (e) => {
    e.preventDefault();
  const form = e.target;
  const email =form.email.value;
  console.log(email)
 
  try {
    const response = await axios.post(`${serverURL}/newsletter`, { email }, {
      headers: {
          'Content-Type': 'application/json'
      }
  });

    if (response.status === 200) {
      toast.success('Thank you for subscribing to our newsletter', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  } catch (error) {
    console.error('There was a problem with the request:', error);
  }
};
  return (
    <Banner>
      <div className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex w-full flex-shrink-0 items-center sm:w-auto">
          <form onSubmit={handalNewsLater} className="flex w-full flex-col items-center md:flex-row md:gap-x-3">
            <Label
              htmlFor="email"
              className="mb-2 mr-auto flex-shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400 md:m-0 md:mb-0"
            >
              Subscribe to our Newsletter
            </Label>
            <TextInput id="email" name="email" placeholder="Enter your email" required type="email" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
        <Banner color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
        </Banner>
      </div>
      <div>
                  <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        </div>
    </Banner>
  );
}

export default Newsletter;