import ModeToggle from "@/components/mode-toggle";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Inbox, Search, Settings } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";

const HomePage = () => {
    const SERVER = import.meta.env.VITE_SERVER;
    const { user, avatar } = useAuth(SERVER);
    const { username } = useParams();
    const isMobile = useIsMobile();

    const items = [
        { 
            title: "Inbox", 
            url: "#", 
            icon: Inbox 
        },
        { 
            title: "Search", 
            url: "#", 
            icon: Search 
        },
        { 
            title: "Settings", 
            url: "#", 
            icon: Settings 
        },
    ];

    return (
        <div className="flex flex-col min-h-screen md:flex-row">
            {/* Desktop Sidebar */}
            {!isMobile && (
                <div className="w-64">
                    <SidebarProvider>
                        <Sidebar>
                            <SidebarContent>
                                <SidebarGroup>
                                    <SidebarGroupLabel>
                                        <Avatar>
                                            <AvatarImage src={avatar} />
                                            <AvatarFallback>{username}'s avatar</AvatarFallback>
                                        </Avatar>
                                        {username}'s Task
                                    </SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {items.map((item) => (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <a href={item.url}>
                                                            <item.icon />
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
                    </SidebarProvider>
                </div>
            )}

            {/* Main Content */}
            <div className="p-6 pb-16">
                <div className="flex">
                    <h1 className="text-2xl font-bold">Home, Welcome {username}</h1>
                    <ModeToggle />
                </div>
                {/* Page content */}
            </div>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 border-t">
                    <div className="flex justify-around items-center py-2">
                        {items.map((item) => (
                            <a
                                key={item.title}
                                href={item.url}
                            >
                                <item.icon />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
