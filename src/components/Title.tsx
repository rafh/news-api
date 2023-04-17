import { Heading, Text} from "@chakra-ui/react";
import { useCountryStore } from "../store/countryStore";

export const Title = () => {
	const { country } = useCountryStore();

	return (<Heading as="h1" size={['xl', '2xl']} mb={10}>
		Top News from{' '}
		<Text color="#08c" display="inline">
			{country === 'gb' ? 'Great Britain' : 'United States'}
		</Text>
	</Heading>);
};
