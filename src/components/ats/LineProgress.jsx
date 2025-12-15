import ProgressBar from "@ramonak/react-progress-bar";

const LineProgress = ({ label, value, color }) => {
  return (
    <div className="flex flex-col space-y-2 lg:space-y-3">
      {/* label and percentage %  */}
      <div className="  flex justify-between lg:space-x-5  font-[Kumbh Sans] text-balance ">
        <p className="text-[13px] font-medium text-start lg:text-[21px]">
          {label}
        </p>
        <p className="text-[13px] font-medium lg:text-[21px]">{value}%</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        completed={value}
        label={false}
        height="12px"
        bgColor={color}      
        baseBgColor="#ccc8c8ff"  
        isLabelVisible={false}
        className="w-[170px] sm:w-[170px] lg:w-[300px]"
      />
    </div>
  );
};

export default LineProgress;
