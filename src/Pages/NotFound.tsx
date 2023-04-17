import { Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		<Flex
			justify="center"
			flex="1"
			alignItems="center"
			flexDirection="column"
			minHeight="80vh"
		>
			<Text fontSize="9xl" color="#cc3a00" display="block">
				404
			</Text>
			<Button>
				<Link to="/">Return Home</Link>
			</Button>
		</Flex>
	);
};
