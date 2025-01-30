# Image Gallery

An image gallery app built with React and Vite. This app allows users to browse images, load more images on scroll, and search for images based on keywords. The app uses a mock API to simulate fetching images, and includes testing for components using Jest and React Testing Library.

## Features

- **Image Gallery**: Displays images in a grid layout.
- **Infinite Scroll**: More images are loaded when the user scrolls to the bottom of the page.
- **Search**: Users can search for images by keywords (e.g., "nature", "cars", etc.).

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast and optimized build tool.
- **Styled Components**: For writing CSS-in-JS and styling components.
- **TypeScript**: Superset of JavaScript that adds type safety.

## Installation

To get started with the project, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/antas135/scroll-app.git
cd scroll-app
```

### 2 Install dependencies

Make sure you have [Node.js](https://nodejs.org/en) installed. Then, run:
```bash
npm install
```

### 3. Start the development server

To run the app in development mode, use:

```bash
npm run dev
```

### Usage

Scroll: As you scroll to the bottom of the page, more images will load dynamically.
Search: Type a keyword in the search bar to filter images.

### What I would like to add. 

Virtualised scrolling limit the number of images in memory by removing from the start and adding a button to reload, or just virtualise the scroll to 10 pages (120 images)

View favorites add a modal to view favorites

add a picture fullscreenView using the better quality pictures.

add test coverage. 