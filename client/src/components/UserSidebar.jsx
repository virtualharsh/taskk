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
import { Home, Bell, Search, Settings, SquareCheckBig } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import useAuth from "../hooks/useAuth";
import { Link, useParams, useLocation } from "react-router-dom";
import ModeToggle from "@/components/mode-toggle";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


const UserSidebar = () => {
    const { username } = useParams();
    const isMobile = useIsMobile();
    const localData = JSON.parse(localStorage.getItem('authToken'));
    const { avatar, user } = localData;
    const location = useLocation();

    const items = [
        {
            title: "Home",
            url: `/user/${username}`,
            icon: Home,
        },
        {
            title: "Alerts",
            url: `/user/${username}/notifications`,
            icon: Bell,
        },
        {
            title: "Search",
            url: `/user/${username}/search`,
            icon: Search,
        },
        {
            title: "Settings",
            url: `/user/${username}/settings`,
            icon: Settings,
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <div className="w-64">
                    <SidebarProvider>
                        <Sidebar>
                            <SidebarContent>
                                <SidebarGroup>
                                    <SidebarGroupLabel className="px-4 py-6 mb-4">
                                        <Link to={`/user/${username}`} className="flex items-center gap-2 font-semibold text-black dark:text-white text-xl md:text-2xl">
                                            <SquareCheckBig size={20} />
                                            <span>Taskk</span>
                                        </Link>
                                    </SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {items.map((item) => (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <Link
                                                            to={item.url}
                                                            className={`flex items-center text-xl gap-2 py-5 px-4 rounded-md ${location.pathname === item.url ? "bg-accent text-black dark:text-white" : "hover:bg-accent text-zinc-500 dark:text-zinc-400 "}`}
                                                        >
                                                            <item.icon size={30} />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            </SidebarContent>
                        </Sidebar>
                    </SidebarProvider>
                </div>
            )}

            <div className="fixed flex gap-2 md:gap-3 items-center justify-start right-0 top-0 p-4 md:pr-6">
                <div>
                    <ModeToggle size={24} />
                </div>
                <div className="flex cursor-pointer border-[1px] rounded-xl px-2 py-0.5 items-center justify-center gap-1">
                    <Avatar className='w-12 h-12'>
                        <AvatarImage 
                        src={avatar}  
                        // src="h"
                        alt="avatar" />
                        <AvatarFallback>{user.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-lg">{user}</span>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
                    <div className="flex h-20 justify-around items-center py-2">
                        {items.map((item) => (
                            <Link
                                key={item.title}
                                to={item.url}
                            >
                                <item.icon
                                    className={`transition-all duration-300 ease-in-out ${location.pathname === item.url
                                        ? "scale-105"
                                        : "text-muted-foreground hover:scale-105"}`}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default UserSidebar;
