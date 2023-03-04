import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LineChart, ResponsiveContainer } from 'recharts';
import { Line, XAxis, YAxis } from 'recharts';

const DeviceChart = ({ stamps }) => {
  const theme = useTheme();

  const hours = stamps && stamps.map(date => new Date(date).getHours());
  let data = [];

  for (let i = 0; i <= 24; i++) {
    data = [...data, {
      time: i < 10 ? '0' + i + ':00' : i + ':00',
      amount: hours && hours.filter(x => x === i).length
    }]
  }

  return (
    <Box sx={{ p: 2, height: 200 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: -20 }}
        >
          <XAxis
            dataKey='time'
            stroke={theme.palette.text.secondary}
            style={theme.typography.body1}
          />
          <YAxis
            allowDecimals={false}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body1}
          >
          </YAxis>
          <Line
            type='monotone'
            dataKey='amount'
            stroke={theme.palette.primary.main}
            isAnimationActive={false}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
};

export default DeviceChart;
