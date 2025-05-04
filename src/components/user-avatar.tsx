import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ExitIcon,
  GearIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { capitalize } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface UserAvatarProps {
  user: Session["user"];
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const { theme, setTheme } = useTheme();
  const themeToSwitch = theme === "dark" ? "light" : "dark";

  const friendlyRoles = user.roles
    .map((r) => capitalize(r.replace(/^ROLE_/, "").toLowerCase()))
    .join(", ");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.profilePictureUrl ?? ""} />
          <AvatarFallback>
            {user.username.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`@${user.username}`}</DropdownMenuLabel>
        <p className="text-muted-foreground pl-2 text-xs">{friendlyRoles}</p>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PersonIcon className="mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GearIcon className="mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(themeToSwitch)}>
          {themeToSwitch === "dark" ? (
            <MoonIcon className="mr-2" />
          ) : (
            <SunIcon className="mr-2" />
          )}
          <span>{capitalize(themeToSwitch)}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <ExitIcon className="mr-2" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
