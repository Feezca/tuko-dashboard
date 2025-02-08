import { useOutletContext } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Profile from "../components/Profile";
import { User } from "../../lib/services/authenticationContext/authentication.context";
import Shifts from "../components/Shifts";

interface ContextType {
  user: User;
}

const Dashboard = () => {
  const context = useOutletContext<ContextType>();

  return (
    <>
      <Tabs defaultValue="profile" className="mt-3 h-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="shifts">
            Turnos
          </TabsTrigger>
          <TabsTrigger className="w-full" value="profile">
            Perfil
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile user={context.user} />
        </TabsContent>
        <TabsContent value="shifts">
          <Shifts />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
