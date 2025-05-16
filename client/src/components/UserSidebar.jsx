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
import { Link, useParams } from "react-router-dom";
import ModeToggle from "@/components/mode-toggle";


const UserSidebar = () => {
    const SERVER = import.meta.env.VITE_SERVER;
    const { user, avatar } = useAuth(SERVER);
    const isMobile = useIsMobile();
    const { username } = useParams();

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
                                                        <Link to={item.url} className="flex items-center text-xl gap-2 py-5 px-4 hover:bg-accent rounded-md">
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

            <div className="fixed right-0 top-0 p-4 md:pr-6">
                <ModeToggle size={24} />
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
                                <item.icon />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default UserSidebar;
