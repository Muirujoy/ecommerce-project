
# ecommerce-project

MUJOS SHOP - Dynamic E-Commerce Frontend
Overview

MUJOS SHOP is a modern, fully responsive e-commerce frontend built with Next.js, TypeScript, and Tailwind CSS.
It simulates a real-world online shop with:

User authentication (Sign Up / Login)

Product catalog with search and category filters

Cart management with dynamic updates

Profile dropdown with logout and settings

Live chat box for customer support

Responsive design for desktop and mobile

Real-time product fetching from an API (fakestoreapi.com)

The project emphasizes modular React components, client-side state management, and smooth user experience.

Features
1. Authentication

Sign Up / Login functionality

Redirects users to catalog after successful authentication

Redirects unauthenticated users to auth page when accessing protected routes

Logout clears session and returns to auth page

2. Navigation Bar

Fixed NavBar with:

Cart icon (shows added products)

Profile icon (shows logout and settings)

Chat icon (live chat messages)

Icons are interactive and mutually exclusive (clicking one closes others)

“X” button closes open dropdowns

MUJOS SHOP brand in #EAB308 (Tailwind yellow-500)

3. Product Catalog

Displays products fetched from fakestoreapi.com

Grid layout (2 columns on mobile, 4 on desktop)

Search bar for live product filtering

Category filter bar

Add to Cart button on each product

Shows a message if no products are found

4. Cart

Shows list of added products

Can add multiple products dynamically

Shows total items (can be extended to total price)

“X” button closes the cart dropdown

5. Profile

Dropdown menu for:

Logout

Settings

Track orders

Logout clears session and redirects to auth page

6. Chat

Simple live chat box

Shows support and user messages

Input box to send messages

“X” button closes the chat dropdown

7. Responsive Design

Fully responsive for mobile and desktop

Tailwind CSS ensures consistent spacing, hover effects, and transitions

Tech Stack
Layer	Technology
Frontend	Next.js, React, TypeScript
Styling	Tailwind CSS
Icons	React Icons (FaShoppingCart, FaUserCircle, FaCommentDots)
API	Fake Store API

State Management	React useState and useEffect
Routing	Next.js Pages Router (pages/)
Installation

Clone the repository:

git clone https://github.com/Muirujoy/ecommerce-project.git
cd ecommerce-project


Install dependencies:

npm install


Run the development server:

npm run dev


Open http://localhost:3000
 in your browser.

/ redirects automatically to the authentication page

After login/sign-up, you are redirected to /catalog

Project Structure
ecommerce-catalog/
├─ components/
│  ├─ NavBar.tsx          # Navigation bar with icons and dropdowns
│  ├─ ProductCard.tsx     # Individual product cards
│  ├─ FilterBar.tsx       # Category filter bar
├─ pages/
│  ├─ index.tsx           # Redirects to authentication page
│  ├─ auth.tsx            # Authentication page (Sign Up / Login)
│  ├─ catalog.tsx         # Product catalog page
├─ public/                # Images or static assets
├─ styles/                # Tailwind CSS config
├─ tsconfig.json
├─ package.json
├─ tailwind.config.js
└─ README.md

Component Breakdown
NavBar

Displays MUJOS SHOP brand

Cart, Profile, Chat icons

Manages dropdown visibility and exclusivity

ProductCard

Shows product image, title, description, and price

Includes Add to Cart button

FilterBar

Displays dynamic product categories

Allows filtering products by selected category

Catalog Page

Protected route: checks for logged-in user

Search bar and category filter

Product grid with add to cart functionality

Dropdowns for cart, profile, and chat

Authentication Flow

User opens app → redirected to /auth

Sign Up / Login

On success → store user in localStorage

Redirect to /catalog

Logout → clear localStorage → redirect to /auth

Tailwind Colors Used
Element	Tailwind Class	Hex Color
Brand (MUJOS)	text-yellow-500	#EAB308
Buttons	bg-yellow-500	#EAB308
Hover Buttons	hover:bg-yellow-400	#FACC15
Background	bg-black	#000000
Navbar	bg-gray-900	#111827
Future Enhancements

Add remove from cart functionality and total price calculation

Implement user authentication with backend API

Add real-time chat with WebSocket or Firebase

Integrate payment gateway for checkout

Add order tracking dashboard

Use server-side rendering for better SEO
my live vercel link https://ecommerce-project-5u9p.vercel.app/
