import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"
import EventCalendar from "@/components/EventCalendar"

const StudentPage = () => {
    return(
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* left side */}
            <div className="w-full lg:w-2/3">
                <div className="h-full bg-white rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (4A)</h1>
                    <BigCalendar/>
                </div>
            </div>
            {/* right side */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalendar/>
                <Announcements/>
            </div>
        </div>
    )
}
export default StudentPage