import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Type, BookOpen, UserCircle, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/fonts', icon: Type, label: 'Fonts' },
    { to: '/libraries', icon: BookOpen, label: 'Libraries' },
    { to: '/users', icon: UserCircle, label: 'Users' },
    { to: '/groups', icon: Users, label: 'Groups' },
];

const NavigationMenu: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.nav
            className="bg-background border-r border-border h-screen p-4 flex flex-col"
            initial={{ width: 240 }}
            animate={{ width: isExpanded ? 240 : 80 }}
            transition={{ duration: 0.3 }}
        >
            {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `flex items-center px-3 py-2 my-1 rounded-md text-sm font-medium ${
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-primary'
                        }`
                    }
                >
                    <Icon className="h-5 w-5" />
                    {isExpanded && <span className="ml-3">{label}</span>}
                </NavLink>
            ))}
            <Button
                variant="ghost"
                size="icon"
                className="mt-auto self-end"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </Button>
        </motion.nav>
    );
};

export default NavigationMenu;