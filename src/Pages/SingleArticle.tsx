import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Box,
	Image,
	Text,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export const SingleArticle = () => {
	const location = useLocation();
	const [article, setArticle] = useState<NewsArticle>();

	useEffect(() => {
		if (location.state) {
			setArticle(location.state?.data satisfies NewsArticle);
		}
	}, []);

	if (!article) {
		return <div>Article not found</div>;
	}

	return (
		<Box maxWidth={1000} margin="auto">
			<Heading as="h1" size={['xl', '2xl']} mb={4}>
				{article.title}
			</Heading>
			<Text fontSize="sm" mb={4}>
				Written by {article.author}
			</Text>
			<Image
				src={
					article.urlToImage ??
					`https://placehold.jp/08c/ffffff/1280x720.png?text=- - -`
				}
				alt={article.title}
				mb={4}
			/>
			<Text fontSize="md">{article.description}</Text>
			<Button display="block" variant="ghost" size="sm" colorScheme="blue">
				<Link to="/">
				<ChevronLeftIcon /> Back to News
				</Link>
			</Button>
		</Box>
	);
};
