import { ScaleLoader } from 'react-spinners'; // Assuming you have 'react-spinners' installed

const Loading = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      {/* The 'ScaleLoader' creates a visually modern spinner.
        I've set the color to 'lime' and the height/width of the bars for effect.
      */}
      <ScaleLoader
        // Using a strong green/lime hex code that aligns with common Tailwind 'lime' palette
        color="#84cc16" // This is Tailwind's 'lime-500' color
        height={35} // Height of each bar
        width={4} // Width of each bar
        radius={2} // Border radius of each bar
        margin={2} // Spacing between the bars
      />
    </div>
  );
};

export default Loading;
