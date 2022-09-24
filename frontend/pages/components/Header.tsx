import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    AvatarBadge
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, } from '@chakra-ui/icons';
import { destroyCookie } from "nookies"
import Router from "next/router";


const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function withAction({ user }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    function destroySection() {
        destroyCookie(null, 'nextauth.token')
        Router.push('/')
    }
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} p={2}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <a href='/'><Box>MyDiary</Box></a>

                    </HStack>
                    <Flex alignItems={'center'}>
                        <a href="/post">


                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={'sm'}
                                mr={4}
                                leftIcon={<AddIcon />}>
                                Novo Registro
                            </Button>
                        </a>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar>
                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                </Avatar>
                                <br></br>
                                <small>{user?.name}</small>
                            </MenuButton>
                            <MenuList>
                                <a href='/post'>
                                    <MenuItem>Adicionar Artigo</MenuItem>
                                </a>
                                <MenuDivider />
                                <a href='/profile'><MenuItem>Editar Perfil</MenuItem></a>
                                <MenuItem onClick={destroySection}>Sair</MenuItem>

                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>

                    </Box>
                ) : null}
            </Box>


        </>
    );
}
