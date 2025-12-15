import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(`/trends?q=${encodeURIComponent(query)}`);
        }
    };

    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);

    React.useEffect(() => {
        // Fetch mock notifications
        fetch('http://localhost:8001/api/intelligence')
            .then(res => res.json())
            .then(data => {
                if (data.alerts) setNotifications(data.alerts);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-black/50 backdrop-blur-sm relative z-50">
            <div className="flex items-center gap-4 w-96">
                <Search className="text-gray-500" size={20} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search markets, trends, or competitors..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 focus:ring-0"
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 text-gray-400 hover:text-white transition-colors relative"
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-4">
                            <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Strategic Alerts</h3>
                            <div className="space-y-3">
                                {notifications.length > 0 ? notifications.map((note, i) => (
                                    <div key={i} className="text-sm text-gray-300 border-b border-gray-800 pb-2 last:border-0 hover:bg-gray-800/50 p-2 rounded transition-colors cursor-pointer">
                                        {note}
                                    </div>
                                )) : (
                                    <div className="text-gray-500 text-sm">No new alerts</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
