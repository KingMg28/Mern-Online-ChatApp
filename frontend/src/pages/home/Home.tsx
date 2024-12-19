import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex  min-h-full  max-h-full    rounded-lg shadow-2xl  border  border-solid border-slate-700 overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
