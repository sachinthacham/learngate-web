import React from 'react';
import FormModal from './FormModal';
import { role } from '@/lib/data';
import { FaArrowRight } from 'react-icons/fa';
type ClassType = {
   item:{
    id:number;
    name:string;
    capacity:number;
    gradeId:number;
    grade:{
        id:number,
        level:number
    }
    supervisorId:number,
    supervisor:{
        id:number,
        name:string,
        surname:string
    }
   } 
}
const GradeCard = ({ item}:ClassType) => {
  return ( <div className='flex flex-col transform hover:scale-105 '>
     
    <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md rounded-tl-lg rounded-tr-lg px-12 py-8 hover:shadow-2xl transition-shadow duration-300 w-full max-w-lg mx-auto flex flex-col items-center bg-cover "
    style={{ backgroundImage: 'url("/classImage.jpeg")', }}>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Grade Level */}
      <h2 className="text-2xl font-bold mb-6 z-10">
     class {item.name}
      </h2>

      {/* Admin Actions */}
      {role === "Admin" && (
        <div className="w-full space-y-6">
          <FormModal table="subject" type="update" data={item}/>
        </div>
      )}
      </div>
      <div className='flex justify-center items-center w-full bg-[#60A5FA] rounded-bl-lg rounded-br-lg text-white text-base py-2 z-10 cursor-pointer'>
        <h4 className='flex justify-center gap-3 items-center'><p>To Dashboard</p><FaArrowRight size={20}/></h4>
      </div>
    </div>
    );
};
export default GradeCard;
