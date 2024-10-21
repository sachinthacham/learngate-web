import Announcements from '@/components/Announcements';
import BigCalendar from '@/components/BigCalendar';
import Performance from '@/components/Performance';
import Image from 'next/image'
import Link from 'next/link';

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex-col gap-4 xl:flex-row">
        {/* Left */}
        <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-4">
            {/* User Info Card */}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                <div className="w-1/3">
                    <Image 
                     src="https://images.unsplash.com/photo-1683965832190-0781083f2519?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                     alt="" width={144} height={144} className='w-36 h-36 rounded-full object-cover' />
                </div>
                <div className="w-2/3 flex flex-col justify-between gap-4">
                    <h1 className='text-xl font-semibold'>sachintha chamindu</h1>
                    <p className='text-sm text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum repudiandae veniam eligend
                    </p>
                    <div className='flex items-center justify-between gap-2 flex-wrap text-xs'>
                       <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                            <Image src="/blood.png" alt="" width={14} height={14}/>
                            <span>A+</span>
                       </div>
                       <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                            <Image src="/date.png" alt="" width={14} height={14}/>
                            <span>january 2025</span>
                       </div>
                       <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                            <Image src="/mail.png" alt="" width={14} height={14}/>
                            <span>sachintha@gmail.com</span>
                       </div>
                       <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                            <Image src="/phone.png" alt="" width={14} height={14}/>
                            <span>077 23457635</span>
                       </div>

                    </div>
                </div>
            </div>
            {/* Small Cards */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
               {/* Card */}
               <div className='bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]' >
                <Image src='/singleAttendance.png' alt="" width={24} height={24} className='w-6 h-6'/>
                <div>
                    <h1 className='text-xl font-semibold'>90%</h1>
                    <span className='text-sm text-gray-400'>Attendance</span>
                </div>
               </div>
               {/* Card */}
                <div className='bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]' >
                <Image src='/singleLesson.png' alt="" width={24} height={24} className='w-6 h-6'/>
                <div>
                    <h1 className='text-xl font-semibold'>6</h1>
                    <span className='text-sm text-gray-400'>Lessons</span>
                </div>
                </div>
                {/* Card */}
                <div className='bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]' >
                <Image src='/singleAttendance.png' alt="" width={24} height={24} className='w-6 h-6'/>
                <div>
                    <h1 className='text-xl font-semibold'>2</h1>
                    <span className='text-sm text-gray-400'>Branches</span>
                </div>
                </div>
                {/* Card */}
                <div className='bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]' >
                <Image src='/singleClass.png' alt="" width={24} height={24} className='w-6 h-6'/>
                <div>
                    <h1 className='text-xl font-semibold'>6</h1>
                    <span className='text-sm text-gray-400'>Classes</span>
                </div>
                </div>
            </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1>Teacher&apos;s Schedule</h1>
            <BigCalendar/>

        </div>
     


        </div>
        {/* Right */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
            <div className='bg-white p-4 rounded-md'>
               <h1 className='text-xl font-semibold'>Shortcuts</h1>
               <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
                    <Link href="" className='p-3 rounded-md bg-lamaSkyLight'>Teacher&apos;s Classes</Link>
                    <Link href="" className='p-3 rounded-md bg-lamaPurple'>Teacher&apos;s Students</Link>
                    <Link href="" className='p-3 rounded-md bg-green-50'>Teacher&apos;s Lessons</Link>
                    <Link href="" className='p-3 rounded-md bg-lamaYellow'>Teacher&apos;s Exams</Link>
                    <Link href="" className='p-3 rounded-md bg-pink-50'>Teacher&apos;s Assignments</Link>
               </div>
            </div>
            <Performance/>
            <Announcements/>
        </div>
    </div>
  )
}

export default SingleTeacherPage;
