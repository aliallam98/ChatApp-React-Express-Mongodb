import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { isLoading, logout } = useLogout();
  return (
    <Button
      disabled={isLoading}
      onClick={logout}
      className="absolute bottom-2 left-2 w-auto h-auto p-2 hover:bg-black/5"
      variant={"ghost"}
    >
      <LogOut size={20} className="rotate-180" />
    </Button>
  );
};

export default LogoutButton;
