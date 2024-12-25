"use client";

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

type AnnouncementProps = {
  recentAnnouncements: Announcement[];
};

const Announcements = ({ recentAnnouncements }: AnnouncementProps) => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold"></h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {recentAnnouncements.map((annoumcement) => (
          <div className="bg-lamaSkyLight rounded-md p-4 ">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{annoumcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md py-1">
                {annoumcement.date}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {annoumcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
