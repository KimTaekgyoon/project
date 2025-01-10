import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateGuestBook from './CreateGuestBook';
import {authRequest} from "../../../apis/api";

// 포스트잇 색상 배열
const postItColors = [
  "#FFECB3", // 부드러운 노란색
  "#FFE0B2", // 부드러운 오렌지색
  "#C8E6C9", // 부드러운 초록색
  "#BBDEFB", // 부드러운 파란색
  "#F8BBD0", // 부드러운 핑크색
  "#D1C4E9", // 부드러운 보라색
  "#B2EBF2", // 부드러운 청록색
  "#FFCDD2", // 부드러운 빨간색
  "#F0E68C", // 부드러운 카키색
  "#FFCCBC", // 부드러운 살구색
  "#E6EE9C", // 부드러운 라임색
  "#B3E5FC", // 부드러운 하늘색
  "#D7CCC8", // 부드러운 베이지색
  "#FFF9C4", // 부드러운 연노랑색
  "#C5CAE9", // 부드러운 라벤더색
  "#FFD180", // 부드러운 복숭아색
  "#FFAB91", // 부드러운 코랄색
];

// 핀 색상 배열
const pinColors = [
  "#D3D3D3", // 부드러운 회색
  "#FFCDD2", // 부드러운 빨간색
  "#BBDEFB", // 부드러운 파란색
  "#C8E6C9", // 부드러운 초록색
  "#FFE0B2", // 부드러운 오렌지색
  "#D1C4E9", // 부드러운 보라색
  "#FFECB3", // 부드러운 노란색
  "#B2EBF2", // 부드러운 청록색
  "#F8BBD0", // 부드러운 연핑크색
  "#E6EE9C", // 부드러운 라임색
  "#FFCCBC", // 부드러운 살구색
  "#F0E68C", // 부드러운 카키색
  "#D7CCC8", // 부드러운 베이지색
  "#C5CAE9", // 부드러운 라벤더색
  "#FFD180", // 부드러운 복숭아색
  "#DCEDC8", // 부드러운 연둣빛
  "#FFAB91", // 부드러운 코랄색
  "#CFD8DC", // 부드러운 청회색
];

// 랜덤 색상 선택 함수
const getRandomColor = (colors) => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// 포스트잇 스타일 정의
const PostIt = (props) => (
  <Box
    bg={getRandomColor(postItColors)} 
    border="1px solid #fbc02d"
    borderRadius="4px"
    p="10px"
    m="10px"
    boxShadow="2px 2px 5px rgba(0, 0, 0, 0.3)"
    width="200px"
    position="relative"
    fontFamily="'Arial', sans-serif"
    {...props}
  />
);

// 포스트잇 핀 스타일 정의
const Pin = (props) => (
  <Box
    width="15px" 
    height="15px" 
    bg={getRandomColor(pinColors)}
    borderRadius="50%"
    position="absolute"
    top="-8px" 
    right="10px"
    boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
    {...props}
  />
);

// 방명록 리스트 스타일 정의
const PostItList = (props) => (
  <Flex
    wrap="wrap"
    justify="center"
    position="relative"
    pb="60px"
    {...props}
  />
);

// 버튼 스타일 정의
const AddButtonContainer = (props) => (
  <Flex
    justify="center"
    mt="20px"
    {...props}
  />
);

const PostItItem = ({ message }) => (
  <PostIt>
    <Pin />
    {message}
  </PostIt>
);

const GestBookList = ({ showAddButton = true }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await authRequest.get(`/api/v1/page/guestBook/list`, {
          
        });
        setMessages(response.data);
      } catch (err) {
        console.error('방명록을 가져오는 데 실패했습니다:', err);
        setError('방명록을 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleModalSubmit = async () => {
    try {
      const response = await authRequest.get(`/api/v1/page/guestBook/list`, {
        params: { limit: 1000 }
      });
      setMessages(response.data);
    } catch (err) {
      console.error('방명록을 가져오는 데 실패했습니다:', err);
    }
  };

  if (loading) return <Text>로딩 중...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <VStack spacing={4}>
      <PostItList>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <PostItItem key={msg.guestbookId} message={msg.content} />
          ))
        ) : (
          <PostIt>
            <Pin />
            방명록이 없습니다.
          </PostIt>
        )}
      </PostItList>
      {showAddButton && (
        <AddButtonContainer>
          <Button variant='gradient' onClick={onOpen}>
            새 방명록 추가
          </Button>
        </AddButtonContainer>
      )}
      <CreateGuestBook
        isOpen={isOpen}
        onClose={onClose}
        senderId={1} // 추후 실제 senderId로 교체
        receiverId={2} // 추후 실제 receiverId로 교체
        onSubmit={handleModalSubmit} 
      />
    </VStack>
  );
};

export default GestBookList;
