import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

/* eslint-disable react/prop-types */
const Forecast = ({ title, data }) => {
  // Transform data for the line graph
  const graphData = data.map((d) => ({
    name: d.title, // Label for X-axis
    temp: d.temp // Temperature value
  }));
  return (
    <div className='flex flex-col gap-4'>
      {/* Title Section */}
      <div className='flex items-center text-3xl font-semibold'>
        <p>{title}</p>
      </div>

      {/* Weather Cards */}
      <div className='flex flex-row items-center justify-between gap-4'>
        {data.map((d, index) => (
          <div
            key={index}
            className='flex items-center justify-center bg-white shadow-md rounded-xl p-5'
          >
            <img src={d.icon} alt='weather icon' className='w-16 h-16' />
            <div className='flex flex-col items-center gap-2'>
              <p className='font-medium text-lg'>{d.title}</p>
              <p className='text-xl font-bold'>{`${d.temp.toFixed()}°`} </p>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className='mt-8'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={graphData}>
            <CartesianGrid stroke='#e0e0e0' strokeDasharray='5 5' />
            <XAxis dataKey='name' tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Line
              type='monotone'
              dataKey='temp'
              stroke='#8884d8'
              strokeWidth={2}
              dot={{ r: 5, stroke: '#8884d8', strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Forecast;
