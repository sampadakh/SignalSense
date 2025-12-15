import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Forecasts = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('http://localhost:8001/api/forecasts')
            .then(res => res.json())
            .then(d => setData(d))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Revenue Forecast Engine</h2>
                {data && <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-medium border border-green-900">High Confidence: {(data.confidence_score * 100).toFixed(0)}%</div>}
            </div>

            <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 h-[500px]">
                {data ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data.revenue_forecast}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888' }} />
                            <YAxis stroke="#666" tick={{ fill: '#888' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#fff" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 animate-pulse">Running Prediction Models...</div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-gray-800 rounded-xl bg-black/50">
                    <h3 className="text-gray-400 text-sm">Projected Growth</h3>
                    <p className="text-3xl font-bold mt-2">+{data?.market_growth}%</p>
                </div>
                <div className="p-6 border border-gray-800 rounded-xl bg-black/50">
                    <h3 className="text-gray-400 text-sm">6-Month Revenue</h3>
                    <p className="text-3xl font-bold mt-2">$830,000</p>
                </div>
                <div className="p-6 border border-gray-800 rounded-xl bg-black/50">
                    <h3 className="text-gray-400 text-sm">Market Entry ROI</h3>
                    <p className="text-3xl font-bold mt-2">4.2x</p>
                </div>
            </div>
        </div>
    );
};
