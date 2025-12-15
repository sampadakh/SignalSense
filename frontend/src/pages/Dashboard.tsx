import React, { useEffect, useState } from 'react';
import { ArrowUpRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = () => {
    const [stats, setStats] = useState({ trends: 0, revenue: 0, risk: 'Low' });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch Trends count
        fetch('http://localhost:8001/api/trends')
            .then(res => res.json())
            .then(d => setStats(prev => ({ ...prev, trends: d.trends.length })))
            .catch(e => console.error(e));

        // Fetch Revenue
        fetch('http://localhost:8001/api/forecasts')
            .then(res => res.json())
            .then(d => {
                setStats(prev => ({ ...prev, revenue: d.market_growth }));
                setChartData(d.revenue_forecast);
            })
            .catch(e => console.error(e));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            fetch('http://localhost:8001/api/report')
                                .then(res => res.blob())
                                .then(blob => {
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = "SignalSense_Report.pdf";
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                })
                                .catch(e => console.error(e));
                        }}
                        className="px-4 py-2 bg-white text-black rounded-md font-medium text-sm hover:bg-gray-200 transition-colors"
                    >
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Active Trends</h3>
                        <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <p className="text-4xl font-bold text-white">{stats.trends}</p>
                    <p className="text-xs text-gray-500 mt-2">+2 from last week</p>
                </div>
                <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Market Growth</h3>
                        <ArrowUpRight className="text-blue-500" size={20} />
                    </div>
                    <p className="text-4xl font-bold text-white">{stats.revenue}%</p>
                    <p className="text-xs text-gray-500 mt-2">Predicted YoY</p>
                </div>
                <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Risk Score</h3>
                        <AlertTriangle className="text-yellow-500" size={20} />
                    </div>
                    <p className="text-4xl font-bold text-white">{stats.risk}</p>
                    <p className="text-xs text-gray-500 mt-2">Stable market conditions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-gray-800 h-96 bg-gray-900/50 flex flex-col">
                    <h3 className="text-lg font-medium mb-4">Market Momentum</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#fff" fill="url(#colorMomentum)" strokeWidth={2} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: '#666' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="p-6 rounded-xl border border-gray-800 h-96 bg-gray-900/50 flex flex-col">
                    <h3 className="text-lg font-medium mb-4">Recent Alerts</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4 items-start p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-800">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-300">New patent filed by Competitor X for "AI-driven Logistics"</p>
                                    <p className="text-xs text-gray-600 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
