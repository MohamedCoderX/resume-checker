import React from 'react'
import { FaCheckCircle, FaListUl, FaBookmark } from 'react-icons/fa';
const StatCard = ({ icon, label, value, color }) => (
    <div className={`flex items-center gap-2 px-5 py-3 rounded-xl text-white ${color}`}>
      {icon}
      <span className="font-light text-sm">
        {label} : <strong>{value}</strong>
      </span>
    </div>
  );

const Stats = () => {
  return (
    <div className='mt-10'>
         <div className="flex flex-wrap justify-center gap-4">
          <StatCard icon={<FaCheckCircle />} label="Questions Completed" value="0" color="bg-green-500" />
          <StatCard icon={<FaListUl />} label="Remaining Questions" value="30" color="bg-red-400" />
          <StatCard icon={<FaBookmark />} label="Bookmarked Questions" value="2" color="bg-yellow-500" />
        </div>
    </div>
  )
}

export default Stats