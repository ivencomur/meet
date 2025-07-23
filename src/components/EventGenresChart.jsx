import { useState, useEffect, useMemo } from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = useMemo(() => ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'], []);
  const colors = useMemo(() => ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD'], []);

  useEffect(() => {
    const getData = () => {
      const data = genres.map((genre) => {
        const filteredEvents = events.filter((event) =>
          event.summary.toLowerCase().includes(genre.toLowerCase())
        );
        return {
          name: genre,
          value: filteredEvents.length
        };
      });
      return data;
    };

    setData(getData());
  }, [events, genres]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="250%" height={600}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={99}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="center" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;