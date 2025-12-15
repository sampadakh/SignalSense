import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useSearchParams } from 'react-router-dom';

export const TrendRadar = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const url = query
      ? `http://localhost:8001/api/trends?q=${encodeURIComponent(query)}`
      : 'http://localhost:8001/api/trends';

    fetch(url)
      .then(res => res.json())
      .then(d => {
        setData(d.trends);
      })
      .catch(err => console.error("Failed to fetch trends:", err));
  }, [query]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">AI Trend Radar</h2>
      <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 h-[600px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Growth Rate"
                dataKey="growth"
                stroke="#ffffff"
                fill="#ffffff"
                fillOpacity={0.3}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ stroke: '#666', strokeWidth: 1 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 animate-pulse">Loading Global Signal Stream...</div>
        )}
      </div>
    </div>
  );
};
