import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/dashboard/admin",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/dashboard/list/teachers",
        visible: ["Admin", "Teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/dashboard/list/student",
        visible: ["Admin", "Teacher"],
      },
      // {
      //   icon: "/parent.png",
      //   label: "Parents",
      //   href: "/dashboard/list/parents",
      //   visible: ["Admin", "Teacher"],
      // },
      // {
      //   icon: "/subject.png",
      //   label: "Subjects",
      //   href: "/dashboard/list/subjects",
      //   visible: ["Admin"],
      // },
      // {
      //   icon: "/class.png",
      //   label: "Classes",
      //   href: "/dashboard/list/classes",
      //   visible: ["Admin", "Teacher"],
      // },
      // {
      //   icon: "/lesson.png",
      //   label: "Lessons",
      //   href: "/dashboard/list/lessons",
      //   visible: ["Admin", "Teacher"],
      // },
      // {
      //   icon: "/exam.png",
      //   label: "Exams",
      //   href: "/dashboard/list/exams",
      //   visible: ["Admin", "Teacher", "Student", "Parent"],
      // },
      // {
      //   icon: "/assignment.png",
      //   label: "Assignments",
      //   href: "/dashboard/list/assignments",
      //   visible: ["Admin", "Teacher", "Student", "Parent"],
      // },
      // {
      //   icon: "/result.png",
      //   label: "Results",
      //   href: "/dashboard/list/results",
      //   visible: ["Admin", "Teacher", "Student", "Parent"],
      // },
      // {
      //   icon: "/attendance.png",
      //   label: "Attendance",
      //   href: "/dashboard/list/attendance",
      //   visible: ["Admin", "Teacher", "Student", "Parent"],
      // },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/dashboard/list/events",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
      {
        icon: "/class.png",
        label: "Levels",
        href: "/dashboard/list/grades",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/dashboard/list/announcements",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
      {
        icon: "/result.png",
        label: "Payments",
        href: "/dashboard/addPayment",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/dashboard/profile",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["Admin", "Teacher", "Student", "Parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2"
                >
                  <Image src={item.icon} alt="icon" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
