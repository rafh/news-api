import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Stack,
	Image,
	Text,
} from '@chakra-ui/react';

interface ArticleCardProps {
	article: NewsArticle;
	country: string;
}

export const ArticleCard = ({ article, country }: ArticleCardProps) => {
	const formattedDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString(`en-${country}`, {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});

	return (
		<Card maxW="sm" key={article.url}>
			<CardBody>
				{article.urlToImage && (
					<Image
						maxHeight={190}
						width={'100%'}
						objectFit={'cover'}
						src={article.urlToImage}
						alt={article.description}
						borderRadius="lg"
						mb={6}
					/>
				)}
				<Stack spacing="3">
					<Text fontSize="xs">
						{formattedDate(article.publishedAt)}
					</Text>
					<Heading size="md">{article.title}</Heading>
					<Text fontSize="sm">{article.description}</Text>
				</Stack>
			</CardBody>
			<CardFooter>
				<Button variant="ghost" size="sm" colorScheme="blue">
					<Link
						to={`/single/${article.title}`}
						state={{
							data: article,
						}}
					>
						Read More
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};
