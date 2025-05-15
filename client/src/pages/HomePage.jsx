import ModeToggle from "@/components/mode-toggle";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Inbox,
    Search,
    Settings,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

const HomePage = () => {
    const SERVER = import.meta.env.VITE_SERVER;
    const { user, avatar } = useAuth(SERVER);
    const { username } = useParams();

    const items = [
        {
            title: "Inbox",
            url: "#",
            icon: Inbox,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar className="w-64 border-r bg-white dark:bg-zinc-950">
                    <SidebarContent className="p-4">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-sm font-bold text-muted-foreground mb-2">
                                <Avatar>
                                    <AvatarImage src={avatar} />
                                    <AvatarFallback>{username} Avatar</AvatarFallback>
                                </Avatar>
                                {username}'s Task
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a
                                                    href={item.url}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-md"
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">
                            Home, Welcome {username}
                        </h1>
                        <ModeToggle />
                    </div>

                    {/* {avatar && (
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className="w-20 h-20 rounded-full border"
                        />
                    )} */}
                </div>
            </div>
        </SidebarProvider>
    );
};

export default HomePage;
