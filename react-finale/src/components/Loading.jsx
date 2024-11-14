import {RingLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-96'>
      <RingLoader
        color={"blue"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
};

export default Loading;
