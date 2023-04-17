import { SimpleGrid } from '@chakra-ui/react';
import { Title } from './Title';
import { ArticleCard } from './ArticleCard';
import { useCountryStore } from '../store/countryStore';

interface ArticleGridProps {
	articles: NewsArticle[];
}

export const ArticleGrid = ({articles}: ArticleGridProps) => {
	const { country } = useCountryStore();

	return (
		<>
			<Title />
			<SimpleGrid
				spacing={4}
				templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
			>
				{articles.map((article) => {
					return (
						<ArticleCard
							key={article.url}
							article={article}
							country={country}
						/>
					);
				})}
			</SimpleGrid>
		</>
	);
};
