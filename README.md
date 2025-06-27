# Poke Project
Overview
This project is a React application built with TypeScript and Vitest. It consumes the PokéAPI to create a Pokémon browsing experience with three main screens: a Landing Page, a PokeGrid, and a Pokedex. The application emphasizes responsive design, clean code practices, and unit testing, meeting all challenge requirements.

 ## To run the project:
```bash
  npm run dev
```

## Features

Landing Page: An engaging entry point with a "START" button to navigate to the PokeGrid. Includes CSS styling using Tailwind CSS to showcase frontend skills.
PokeGrid: A responsive 3-column grid displaying Pokémon cards with names and sprites. Features include:
Pagination (30 Pokémon per page).
A filter to search Pokémon by name.
A favorites system to add/remove Pokémon and filter by favorites.
A loader to indicate data fetching.
Navigation to the Pokedex upon clicking a card.

Pokedex: A detailed view of a selected Pokémon, displaying:
Number, name, type(s), description, image, weight (WT), and height (HT).
A button to return to the PokeGrid.

Testing: Unit tests for the PokeGrid component using Vitest to ensure proper functionality.

Tech Stack

React: Library for building the user interface.
TypeScript: Ensures type safety and enhances code maintainability.
Vitest: Testing framework for unit tests.
PokéAPI: External API for fetching Pokémon data.
Tailwind CSS: Custom styles for responsive design and animations.
Vite: Build tool for fast development and bundling.
