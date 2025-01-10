import {
  Box,
  Button,
  FormControl,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Textarea
} from "@chakra-ui/react";
import axios from 'axios';
import React, { useState } from 'react';
import {DEFAULT_URL} from "../../../apis/api";

const CreateGuestBook = ({ isOpen, onClose, senderId, receiverId, onSubmit }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        senderId,
        receiverId,
        content,
        createdAt: new Date().toISOString(),
        status: 'ACTIVATE'
    };

    try {
        console.log('Sending data to backend:', formData);
        await axios.post(`${DEFAULT_URL}/api/v1/page/guestBook/new`, formData);
        setContent('');
        onSubmit(); // 성공적으로 제출된 후 onSubmit 콜백 호출
        onClose();
    } catch (err) {
        if (err.response) {
            // 서버의 응답이 있을 때
            console.error('Error response:', err.response.data);
            setError(`방명록 작성에 실패했습니다: ${err.response.data.message || '알 수 없는 오류'}`);
        } else if (err.request) {
            // 서버의 응답이 없을 때
            console.error('Error request:', err.request);
            setError('방명록 작성에 실패했습니다. 서버 응답이 없습니다.');
        } else {
            // 요청 설정 중 오류가 발생했을 때
            console.error('Error message:', err.message);
            setError(`방명록 작성에 실패했습니다: ${err.message}`);
        }
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box position="relative">
            <Button
              position="absolute"
              top="10px"
              right="10px"
              bg="red.500"
              color="white"
              _hover={{ bg: 'red.400' }}
              onClick={onClose}
            >
              X
            </Button>
            <Heading mb={4}>방명록 작성</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <Textarea
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </FormControl>
              {error && <Box color="red.500" mb={4}>{error}</Box>}
              <Button
                type="submit"
                colorScheme="green"
                width="100%"
              >
                작성
              </Button>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateGuestBook;
