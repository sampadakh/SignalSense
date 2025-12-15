import { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Zap, TrendingDown } from 'lucide-react';

export const Intelligence = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('http://localhost:8001/api/intelligence')
            .then(res => res.json())
            .then(d => {
                // Transform data for scatter chart
                const chartData = d.competitors.map((c: any) => ({
                    x: c.risk === 'High' ? 80 : c.risk === 'Medium' ? 50 : 20,
                    y: c.impact === 'High' ? 80 : c.impact === 'Medium' ? 50 : 20,
                    z: 100, // Bubble size
                    name: c.name,
                    action: c.action
                }));
                setData({ ...d, chartData });
            })
            .catch(err => console.error(err));
    }, []);

    const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Competitive Intelligence Scanner</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Map */}
                <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 h-[500px]">
                    <h3 className="text-gray-400 text-sm font-medium mb-4">Risk vs. Impact Map</h3>
                    {data ? (
                        <ResponsiveContainer width="100%" height="90%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis type="number" dataKey="x" name="Risk" unit="%" stroke="#666" tick={{ fill: '#888' }} domain={[0, 100]} />
                                <YAxis type="number" dataKey="y" name="Impact" unit="%" stroke="#666" tick={{ fill: '#888' }} domain={[0, 100]} />
                                <Tooltip
                                    cursor={{ strokeDasharray: '3 3' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const d = payload[0].payload;
                                            return (
                                                <div className="bg-black border border-gray-700 p-3 rounded shadow-xl">
                                                    <p className="font-bold text-white">{d.name}</p>
                                                    <p className="text-sm text-gray-400">{d.action}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Scatter name="Competitors" data={data.chartData} fill="#8884d8">
                                    {data.chartData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 animate-pulse">Scanning Competitor Signals...</div>
                    )}
                </div>

                {/* Alerts Feed */}
                <div className="space-y-4">
                    <h3 className="text-gray-400 text-sm font-medium">Live Strategic Alerts</h3>
                    {data?.alerts.map((alert: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 border border-gray-800 bg-gray-900/30 rounded-xl hover:border-gray-700 transition-colors">
                            <div className="mt-1">
                                {i === 0 ? <AlertTriangle className="text-red-500" /> : <Zap className="text-yellow-500" />}
                            </div>
                            <div>
                                <p className="text-white font-medium">{alert}</p>
                                <p className="text-sm text-gray-500 mt-1">Detected via Web Crawler • 15 mins ago</p>
                                <div className="mt-3 flex gap-2">
                                    <button className="px-3 py-1 bg-white text-black text-xs font-bold rounded hover:bg-gray-200">View Source</button>
                                    <button className="px-3 py-1 border border-gray-700 text-gray-300 text-xs rounded hover:bg-gray-800">Ignore</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Placeholder for more context */}
                    <div className="p-4 border border-dashed border-gray-800 rounded-xl text-center text-gray-500 text-sm">
                        Scanning 150+ monitored URLs...
                    </div>
                </div>
            </div>
        </div>
    );
};
