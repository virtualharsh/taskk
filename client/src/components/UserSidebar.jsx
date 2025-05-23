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
import { Home, Bell, Search, Settings, SquareCheckBig, LogOut, Trash } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import useAuth from "../hooks/useAuth";
import { Link, useParams, useLocation } from "react-router-dom";
import ModeToggle from "@/components/mode-toggle";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"



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
                                        <Link to={`/user/${username}`} className="flex items-center gap-2 font-semibold text-black dark:text-white text-xl md:text-2xl md:pt-3">
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

            <div className="fixed flex gap-2 md:gap-3 items-center justify-start right-0 top-0 p-4 md:pr-6 z-50">
                <div>
                    <ModeToggle size={24} />
                </div>
                <div className="flex cursor-pointer border-[2px] rounded-full px-1 py-1 items-center justify-center gap-1">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <Avatar className="w-8 h-8 md:w-8 md:h-8">
                                    <AvatarImage src={avatar} alt="avatar" />
                                    <AvatarFallback>{user.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {/* <span className="text-sm md:text-lg">{user}</span> */}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-36 md:w-40" align="end">
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-start gap-2 text-left"
                                        size="sm"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-start gap-2 text-left"
                                        size="sm"
                                    >
                                        <Trash size={16} />
                                        Trash
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* <Avatar className='w-12 h-12'>
                        <AvatarImage
                            src={avatar}
                            // src="h"
                            alt="avatar" />
                        <AvatarFallback>{user.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-lg">{user}</span> */}
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <>
                    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-40">
                        <div className="flex h-20 justify-around items-center py-2">
                            {items.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.url}
                                >
                                    <item.icon
                                        size={24}
                                        className={`transition-all duration-300 ease-in-out ${location.pathname === item.url
                                            ? "scale-105"
                                            : "text-muted-foreground hover:scale-105"}`}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="fixed top-0 left-0 p-4 md:p-6 z-30">
                        <Link to={`/user/${username}`} className="flex items-center gap-2 font-medium pt-1 text-black dark:text-white text-2xl md:text-3xl">
                            <SquareCheckBig size={20} />
                            <span>Taskk</span>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

export default UserSidebar;