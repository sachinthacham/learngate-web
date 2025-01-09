"use client";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import {
  fetchRecentAnnouncementData,
  fetchRecentEventData,
  fetchTotalCountData,
} from "@/lib/data";
import { useEffect, useState } from "react";

type Announcement = {
  id: number;
  title: string;
  description: string;
  class: {
    id: number;
    name: string;
  };
  classId: number;
  date: string;
};

type Event = {
  id: number;
  title: string;
  classId: number;
  description: string;
  class: {
    id: number;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
};

type Count = {
  studentCount: number;
  teacherCount: number;
  parentCount: number;
  boyCount: number;
  girlCount: number;
};
const AdminPage = () => {
  const [recentAnnouncements, setRecentAnnouncements] = useState<
    Announcement[]
  >([]);
  const [recentEventData, setRecentEventData] = useState<Event[]>([]);
  const [TotalCount, setTotalcount] = useState<Count>({
    studentCount: 0,
    teacherCount: 0,
    parentCount: 0,
    boyCount: 0,
    girlCount: 0,
  });

  useEffect(() => {
    const fetchRecentAnnouncemnts = async () => {
      const Announcedata = await fetchRecentAnnouncementData();
      setRecentAnnouncements(Announcedata);
    };
    const fetchEventData = async () => {
      const Eventdata = await fetchRecentEventData();
      setRecentEventData(Eventdata);
    };
    const fetchCountData = async () => {
      const Countdata = await fetchTotalCountData();
      setTotalcount(Countdata);
    };
    fetchRecentAnnouncemnts();
    fetchEventData();
    fetchCountData();
  }, []);
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row ">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* userCards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" count={TotalCount?.studentCount} />
          <UserCard type="teacher" count={TotalCount?.teacherCount} />
          <UserCard type="parent" count={TotalCount?.parentCount} />
        </div>
        {/* middle chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* count chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart
              boyCount={TotalCount.boyCount}
              girlCount={TotalCount.girlCount}
              total={TotalCount.studentCount}
            />
          </div>
          {/* attendance chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        <Announcements recentAnnouncements={recentAnnouncements} />
      </div>
      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar recentEventData={recentEventData} />
      </div>
    </div>
  );
};
export default AdminPage;
