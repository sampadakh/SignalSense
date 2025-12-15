import React from 'react';
import { LayoutDashboard, TrendingUp, Search, BarChart2, Lightbulb } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: TrendingUp, label: 'Trend Radar', path: '/trends' },
    { icon: Search, label: 'Intelligence', path: '/intelligence' },
    { icon: BarChart2, label: 'Forecasts', path: '/forecasts' },
    { icon: Lightbulb, label: 'Strategies', path: '/strategies' },
];

export const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 border-r border-gray-800 bg-black flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tighter">SignalSense</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                            location.pathname === item.path
                                ? "bg-white text-black font-medium"
                                : "text-gray-400 hover:bg-gray-900 hover:text-white"
                        )}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <div className="text-sm">
                        <div className="font-medium">User Admin</div>
                        <div className="text-gray-500 text-xs">Premium Plan</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
