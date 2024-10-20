import UserCard from "@/components/UserCard"
const AdminPage = () => {
    return(
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* left */}
            <div className="w-full lg:w-2/3">
                {/* userCards */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student"/>
                    <UserCard type="teacher"/>
                    <UserCard type="parent"/>
                    <UserCard type="staff"/>
                </div>

            </div>
            {/* right */}
            <div className="w-full lg:">

            </div>
        </div>
    )
}
export default AdminPage