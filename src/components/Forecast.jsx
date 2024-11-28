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
    <div className='flex flex-col gap-6'>
      {/* Title Section */}
      <div className='text-2xl md:text-3xl font-semibold text-center'>
        <p>{title}</p>
      </div>

      {/* Weather Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {data.map((d, index) => (
          <div
            key={index}
            className='flex flex-col items-center bg-white shadow-md rounded-xl p-4'
          >
            <img
              src={d.icon}
              alt='weather icon'
              className='w-12 h-12 sm:w-16 sm:h-16'
            />
            <div className='text-center mt-2'>
              <p className='font-medium text-sm sm:text-lg'>{d.title}</p>
              <p className='text-lg sm:text-xl font-bold'>{`${d.temp.toFixed()}°`}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className='mt-6'>
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
