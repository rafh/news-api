import {
	Alert,
	AlertIcon,
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	SimpleGrid,
	Text,
} from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import debounce from 'just-debounce-it';
import { useState, useEffect, useRef } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { useCountryStore } from '../store/countryStore';
import { Title } from '../components/Title';

export const Search = () => {
	const { country } = useCountryStore();
	const [articles, setArticles] = useState<NewsArticle[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSearch = debounce((e: React.FormEvent<HTMLInputElement>) => {
		const searchQuery = (e.target as HTMLInputElement).value;
		setSearchQuery(searchQuery);
	}, 500);

	const handleSearchClear = () => {
		setSearchQuery('');
		inputRef.current!.value = '';
		setArticles([]);
	};

	const fetchNews = async () => {
		if (!searchQuery) return;

		try {
			const apiKey = import.meta.env.VITE_NEWS_KEY;
			const url = `https://newsapi.org/v2/top-headlines?country=${country}&q=${searchQuery}&apiKey=${apiKey}`;
			const response = await fetch(url);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}
			setArticles(data.articles);
		} catch (error) {
			setErrorMessage('There was an error fetching the news articles.');
		}
	};

	useEffect(() => {
		fetchNews();
	}, [country, searchQuery]);

	return (
		<>
			<InputGroup mb={6}>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray.300" />}
				/>
				<Input
					type="text"
					ref={inputRef}
					placeholder="Search for keywords (e.g. people, places, things)"
					onInput={handleSearch}
				/>
				{searchQuery !== '' && (
					<InputRightElement width="4.5rem">
						<Button size="xs" onClick={handleSearchClear}>
							<CloseIcon />
						</Button>
					</InputRightElement>
				)}
			</InputGroup>
			{articles.length !== 0 && <Title />}
			<SimpleGrid
				spacing={4}
				templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
			>
				{articles.length === 0 && searchQuery !== '' && (
					<Text>No Results</Text>
				)}
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
			{errorMessage && (
				<Alert status="error">
					<AlertIcon />
					{errorMessage}
				</Alert>
			)}
		</>
	);
};
