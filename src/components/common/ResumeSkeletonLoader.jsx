const ResumeSkeletonLoader = () => {
    return (
      <div className="w-[320px] sm:w-[380px] md:w-[420px] bg-white shadow-lg rounded-xl p-6 border border-gray-200 animate-pulse">
        
        {/* Document Header */}
        <div className="h-6 w-2/3 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-6"></div>
  
        {/* Lines like resume paragraphs */}
        <div className="space-y-3">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
        </div>
  
        {/* Section Title */}
        <div className="h-5 w-1/2 bg-gray-300 rounded mt-8 mb-4"></div>
  
        {/* Bullet points */}
        <div className="space-y-3">
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-3/6 bg-gray-200 rounded"></div>
        </div>
  
        {/* Scanning Animation */}
        <div className="relative mt-8 h-2 w-full overflow-hidden bg-gray-200 rounded">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-400/60 blur-sm animate-[scan_1.5s_linear_infinite]"></div>
        </div>
  
        <style>{`
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    );
  };

  export default ResumeSkeletonLoader
  