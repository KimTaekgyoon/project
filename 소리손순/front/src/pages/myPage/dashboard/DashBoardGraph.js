import { Box, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {authRequest} from "../../../apis/api";

const DashBoardGraph = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await authRequest.get('/api/v1/ranking');
        setRankingData(response.data);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  const data = rankingData.map(rank => ({
    name: new Date(rank.created_at).toLocaleDateString(),
    score: rank.score
  }));

  return (
    <Box
      p={0}
      h="100%"   // Use full height of the parent container
      w="100%"   // Use full width of the parent container
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Text color="gray.500" fontStyle="italic">
          랭킹을 등록하면 그래프가 생성됩니다.
        </Text>
      )}
    </Box>
  );
};

export default DashBoardGraph;
