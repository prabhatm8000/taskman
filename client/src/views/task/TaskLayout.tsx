import NavBar from "@/components/NavBar";

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <NavBar />
            <div className="max-w-7xl mx-auto px-4">{children}</div>
        </div>
    );
};

export default TaskLayout;
