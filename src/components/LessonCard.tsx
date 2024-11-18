import React from 'react';
import FormModal from './FormModal';
import { role } from '@/lib/data';
type cardType ={
        item:{
            classSubjectId:number,
            classSubject:{},
            id:number,
            name:string
        }
    }
const SubjectCard = ({ item}:cardType) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
      {role === "Admin" &&
       <FormModal table="subject" type="create" />
      }
      <div className="flex items-center gap-2">
                    
                    {role === "Admin" && (
                      <>
                      <FormModal table="subject" type="update" data={item}/>
                      <FormModal table="subject" type="delete" id={item.id}/>
                      </>
                    )}
      </div>
    </div>
  );
};
export default SubjectCard;

