import {
    Button,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Flex,
    InputLeftElement, InputGroup, Image, Link as ChakraLink, useToast
} from "@chakra-ui/react";
import {Envelope, Lock} from "react-bootstrap-icons";
import {Link as ReactRouterLink, useNavigate} from "react-router-dom";
import {callLoginAPI} from "../../apis/AuthAPICalls";
import {useState} from "react";
import {useDispatch} from "react-redux";

function LoginForm ({ onForgotPassword, onSuccess }){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [ form, setForm ] = useState({});
    const [ formChanged, setFormChanged ] = useState(false);

    const onChangeHandler = e => {
        setFormChanged(true);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    function handleKeyPress(e) {
        if (e.isComposing || e.keyCode === 229) return;

        if (e.key === 'Enter') {
            e.preventDefault(); // 폼 제출 방지
            onClickLoginHandler();
        }

    }

    const handleClearInput = () => {
        setForm("")
    }

    const onClickLoginHandler = () => {
        if (formChanged) {
            dispatch(callLoginAPI({ loginRequest: form, toast })).then(response => {
                if(response?.status === 200) {
                    navigate("/");
                    onSuccess();
                    window.location.reload();
                    handleClearInput();
                }
            });
        }
    };

    return (
        <>
            <Flex w="100%" maxW="350px">
                <form style={{ width: '100%' }} onKeyDown={handleKeyPress}>
                    <Heading textAlign="center" color="#90CDF4" mt="55px">로그인</Heading>
                    <Text textAlign="center" fontSize="12px" color="#828282" mt={2}>소리손순의 다양한 기능을 사용하고 싶다면 로그인해주세요.</Text>

                    <Button
                        mt={9}
                        w="100%"
                        variant='outline'
                        background="#FFFFFF"
                        overflow="hidden"
                        fontWeight="normal"
                        fontSize="12px"
                        color="#333"
                    >
                        <Image src="/images/icon_google.png" mr={2}/> Google 로그인
                    </Button>
                    {/*TODO: 구글 로그인은 시간 나면 추후 구현 예정*/}

                    <Image src="/images/img_line_or.png" mt={10} mb={8}/>

                    <FormControl>
                        <FormLabel fontSize="12px" color="#333">아이디</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Envelope color="#BDBDBD" />
                            </InputLeftElement>
                            <Input type="text" fontSize="12px" placeholder="아이디를 입력하세요"
                                   onChange={onChangeHandler} name="id"/>
                        </InputGroup>
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel fontSize="12px" color="#333" display="flex" justifyContent="space-between" alignItems="flex-end">비밀번호<ChakraLink  onClick={onForgotPassword}> 비밀번호를 잊으셨나요?</ChakraLink></FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Lock color="#BDBDBD" />
                            </InputLeftElement>
                            <Input type="password" autoComplete="current-password" fontSize="12px" placeholder="비밀번호를 입력하세요"
                                   onChange={onChangeHandler} name="password"/>
                        </InputGroup>
                    </FormControl>

                    <Button
                        mt={9}
                        w="100%"
                        variant='gradient'
                        color="white"
                        onClick={onClickLoginHandler}
                    >
                        Login
                    </Button>

                    <Text textAlign="center" fontSize="12px" color="#4F4F4F" mt={5}>아직 계정이 없으신가요? <ChakraLink color="#90CDF4" as={ReactRouterLink} to='/signup'> 회원가입.</ChakraLink></Text>
                </form>
            </Flex>
        </>
    );
}

export default LoginForm;