import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ConfidenceChart = ({ topK }) => {
  if (!topK || topK.length === 0) return null;

  return (
    <div className="h-64 w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topK} layout="vertical" margin={{ left: 20, right: 30 }}>
          <XAxis type="number" hide domain={[0, 1]} />
          <YAxis
            dataKey="type"
            type="category"
            width={60}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: '600' }}
          />
          <Tooltip
            cursor={{ fill: '#f3f4f6' }}
            formatter={(value) => [`${((value ?? 0) * 100).toFixed(1)}%`, 'Probability']}
          />
          <Bar dataKey="probability" radius={[0, 4, 4, 0]} barSize={20}>
            {topK.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#3b62f5' : '#cbd5e1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
