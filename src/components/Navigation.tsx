import { NavLink, useLocation } from 'react-router-dom';
import { Box, Button, ButtonGroup, Flex, HStack } from '@chakra-ui/react';
import { useCountryStore } from '../store/countryStore';

interface NavigationProps {
	country: string;
	handleCountryChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Navigation = () => {
	const location = useLocation();
	const {
    country,
    setCountry,
  } = useCountryStore();

	const handleCountryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		setCountry(target.value);
	};

	return (
		<Box mb={10}>
			<nav>
				<Flex justify="space-between" flex="1" alignItems="center">
					<ButtonGroup variant="link" spacing="8">
						<NavLink className="navigation-link" to="/">
							Top News
						</NavLink>
						<NavLink className="navigation-link" to="/search">
							Search
						</NavLink>
					</ButtonGroup>
					{!location.pathname.includes('/single') && (
						<HStack spacing="3">
							<Button
								_active={{ bg: '#08c' }}
								color={country === 'gb' ? '#fff' : '#1a202c'}
								isActive={country === 'gb'}
								onClick={handleCountryChange}
								type="button"
								value="gb"
								size="sm"
								fontSize="sm"
							>
								GB
							</Button>
							<Button
								_active={{ bg: '#08c' }}
								color={country === 'us' ? '#fff' : '#1a202c'}
								fontSize="sm"
								isActive={country === 'us'}
								onClick={handleCountryChange}
								size="sm"
								type="button"
								value="us"
							>
								US
							</Button>
						</HStack>
					)}
				</Flex>
			</nav>
		</Box>
	);
};
