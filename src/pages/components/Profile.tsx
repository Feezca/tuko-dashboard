import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { User } from "../../lib/services/authenticationContext/authentication.context";

const Profile = ({ user }: { user: User }) => {
  return (
    <Card className="h-full">
      <CardHeader>Perfil</CardHeader>
      <CardContent>
        <h1>{user.email}</h1>
      </CardContent>
    </Card>
  );
};

export default Profile;
