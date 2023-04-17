import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { SingleArticle } from './Pages/SingleArticle';
import { Search } from './Pages/Search';
import { Navigation } from './components/Navigation';
import { NotFound } from './Pages/NotFound';
import { useCountryStore } from './store/countryStore';
import { ArticleGrid } from './components/ArticleGrid';

function App() {
	const [articles, setArticles] = useState<NewsArticle[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { country } = useCountryStore();

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const apiKey = import.meta.env.VITE_NEWS_KEY;
				const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
				const response = await fetch(url);
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message);
				}
				setArticles(data.articles);
			} catch (error) {
				setErrorMessage(
					'There was an error fetching the news articles.',
				);
			}
		};
		fetchNews();
	}, [country]);

	return (
		<div className="app">
			<Navigation />
			<main>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<ArticleGrid articles={articles} />
								{errorMessage && (
									<Alert status="error">
										<AlertIcon />
										{errorMessage}
									</Alert>
								)}
							</>
						}
					></Route>
					<Route path="single/:title" element={<SingleArticle />} />
					<Route path="search" element={<Search />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
