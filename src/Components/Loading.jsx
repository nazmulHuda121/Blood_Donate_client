import { FaTint } from 'react-icons/fa';

const Loading = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? 'h-[250px]' : 'h-[70vh]'
      } flex items-center justify-center`}
    >
      <div className="relative w-20 h-20">
        {/* Rotating circle */}
        <div className="absolute inset-0 rounded-full border-4 border-red-200 border-t-red-600 animate-spin"></div>

        {/* Blood drop icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaTint className="text-red-600 text-3xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
