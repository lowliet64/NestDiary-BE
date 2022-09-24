import { Box, Image, Badge } from "@chakra-ui/react"

import { StarIcon } from "@chakra-ui/icons"

interface CardProps {

    title: string
    body: string
    createdAt: string
}



function CardComponent({ title, body, createdAt }: CardProps) {
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
    }

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={property.imageUrl} alt={property.imageAlt} />

            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='2'
                    >
                        Registro de:{createdAt}
                    </Box>
                </Box>

                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {title}
                </Box>

                <Box>
                    {(body.length > 40) ? body.slice(0, 40) : body}...

                </Box>

            </Box>
        </Box>
    )
}

export default CardComponent;