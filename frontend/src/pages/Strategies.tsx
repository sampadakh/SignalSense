import React from 'react';

export const Strategies = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">AI Recommendations</h2>
            <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-colors cursor-pointer">
                        <h3 className="text-lg font-medium text-white">Strategy Insight #{i}</h3>
                        <p className="text-gray-400 mt-2">AI-generated recommendation based on recent market shifts...</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
