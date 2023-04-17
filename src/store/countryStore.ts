import { create } from 'zustand'

interface State {
	country: string
	setCountry: (country: string) => void
}

export const useCountryStore = create<State>((set) => ({
	country: 'gb',
	setCountry: (selectedCountry: string) => set({ country: selectedCountry }),
}))