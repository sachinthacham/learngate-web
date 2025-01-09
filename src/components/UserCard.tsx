import Image from "next/image";

const UserCard = ({
  type,
  count,
}: {
  type: string;
  count: number | undefined;
}) => {
  const Today = new Date();
  const formattedDate = Today.toISOString().split("T")[0];
  return (
    <div className="rounded-2xl odd:bg-[#00b4d8] even:bg-[#52b788] p-4 flex-1 min-w-[138px] ">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {formattedDate}
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};
export default UserCard;
