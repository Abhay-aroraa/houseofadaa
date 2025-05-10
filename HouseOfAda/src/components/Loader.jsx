import { ClipLoader } from 'react-spinners';

const Loadercomp = ({ size }) => {
  const color = "#2E2D74";
  
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50 z-50">
      <ClipLoader
        color={color}
        loading={true}
        size={size ? size : 80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loadercomp;
