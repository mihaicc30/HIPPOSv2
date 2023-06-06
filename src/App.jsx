import React, { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import MenuItem from "./comp/home/MenuItem";
import MenuItemDetails from "./comp/home/MenuItemDetails";
import Home from "./comp/home/Home";
import Auth from "./comp/isAuth/Auth";
import Layout from "./comp/isAuth/Layout";
import Receipts from "./comp/Receipts/Receipts";
import Settings from "./comp/Settings/Settings";
import Signout from "./comp/signout/Signout";
import Basket from "./comp/basket/Basket";
import Page404 from "./comp/Page404";

// to grab from db later on
const menuitems = [
	{
		name: "Breakfast",
		img: "./assets/breakfast.jpg",
		items: [
			{
				name: "Full Breakfast",
				cal: 350,
				tag: [],
				stock: 10,
				ingredients: [
					"free range eggs",
					"sausage",
					"bacon",
					"mushroom",
					"tomato",
					"baked beans",
					"toast",
					"butter",
				],
				price: 10,
				allergens: ["nut free"],
				img: "./assets/img-8lpKdg0FuYdFH4bJ5jvgH.jpeg",
			},
			{
				name: "Porridge",
				cal: 350,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["scottish oats", "milk", "honey", "wallnuts", "bannana"],
				price: 6,
				allergens: ["nut free", "gluten free"],
				img: "./assets/img-8lpKdg0FuYdFH4bJ5jvgH.jpeg",
			},
			{
				name: "Avocado on Toast",
				cal: 350,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"turmeric sourdough",
					"smashed avocado",
					"lemon",
					"cherry tomatoes",
					"feta cheese",
					"pomegranades",
					"watercress",
					"poached egg",
					"pine nuts",
				],
				price: 9,
				allergens: [],
				img: "./assets/breakfast-avocado-toast.jpg",
			},
			{
				name: "Scrambled Eggs",
				cal: 300,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["eggs", "salt", "pepper", "butter"],
				price: 8,
				allergens: ["nut free", "gluten free"],
				img: "./assets/breakfast-scrambled-eggs.jpg",
			},
			{
				name: "French Toast",
				cal: 400,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["bread", "eggs", "milk", "cinnamon", "sugar"],
				price: 7,
				allergens: ["nut free"],
				img: "./assets/breakfast-french-toast.jpg",
			},
			{
				name: "Yogurt Parfait",
				cal: 250,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["yogurt", "granola", "mixed berries", "honey"],
				price: 6,
				allergens: ["nut free", "gluten free"],
				img: "./assets/breakfast-yogurt-parfait.jpg",
			},
			{
				name: "Protein Pancakes",
				cal: 450,
				tag: [],
				stock: 10,
				ingredients: ["oats", "protein powder", "banana", "eggs", "milk"],
				price: 10,
				allergens: ["nut free"],
				img: "./assets/breakfast-protein-pancakes.jpg",
			},
			{
				name: "Veggie Omelette",
				cal: 300,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["eggs", "bell peppers", "onions", "spinach", "cheese"],
				price: 8,
				allergens: ["nut free", "gluten free"],
				img: "./assets/breakfast-veggie-omelette.jpg",
			},
		],
	},
	{
		name: "Kids Starters",
		img: "./assets/kids.jpg",
		items: [
			{
				name: "Kids Mozzarella Sticks",
				tag: ["vegetarian"],
				stock: 10,
				price: 2,
				allergens: ["nut free"],
				cal: 300,
				img: "./assets/mozzarella-sticks.jpg",
				ingredients: [
					"Mozzarella cheese sticks",
					"Breadcrumbs",
					"Eggs",
					"Flour",
					"Marinara sauce",
				],
			},
			{
				name: "Kids Garlic Bread",
				tag: ["vegetarian"],
				stock: 10,
				price: 2,
				allergens: ["nut free"],
				cal: 300,
				img: "./assets/garlic-bread.jpg",
				ingredients: ["Baguette", "Garlic", "Butter", "Parsley", "Salt"],
			},
			{
				name: "Kids Onion Rings",
				tag: ["vegetarian", "vegan"],
				stock: 10,
				price: 2,
				allergens: ["nut free", "dairy free"],
				cal: 300,
				img: "./assets/onion-rings.jpg",
				ingredients: ["Onions", "Flour", "Baking powder", "Salt", "Milk"],
			},
		],
	},
	{
		name: "Kids Mains",
		img: "./assets/kids.jpg",
		items: [
			{
				name: "Kids Chicken Nuggets",
				cal: 250,
				tag: [],
				stock: 10,
				ingredients: ["chicken breast", "breadcrumbs", "spices"],
				price: 5,
				allergens: ["nut free", "gluten free", "dairy free"],
				img: "./assets/kids-nuggets.jpg",
			},
			{
				name: "Kids Cheese Pizza",
				cal: 350,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese"],
				price: 7,
				allergens: ["nut free"],
				img: "./assets/kids-cheese-pizza.jpg",
			},
			{
				name: "Kids Grilled Cheese Sandwich",
				cal: 300,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["cheddar", "cheese", "bread", "butter"],
				price: 4,
				allergens: ["nut free"],
				img: "./assets/kids-grilled-cheese.jpg",
			},
			{
				name: "Kids Peanut Butter and Jelly Sandwich",
				cal: 280,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["peanut butter", "jelly", "bread"],
				price: 3,
				allergens: [],
				img: "./assets/kids-pbj-sandwich.jpg",
			},
			{
				name: "Kids Macaroni and Cheese",
				cal: 450,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["macaroni pasta", "cheddar cheese", "milk"],
				price: 7,
				allergens: ["nut free"],
				img: "./assets/kids-mac-and-cheese.jpg",
			},
			{
				name: "Kids Mini Pancakes",
				cal: 300,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["pancake batter", "maple syrup", "fruits"],
				price: 6,
				allergens: ["nut free"],
				img: "./assets/kids-mini-pancakes.jpg",
			},
		],
	},
	{
		name: "Drinks",
		img: "./assets/drinks.jpg",
		items: [
			{
				name: "Coca-Cola",
				tag: ["carbonated", "soft drink"],
				stock: 10,
				price: 2,
				allergens: [],
				img: "./assets/coca-cola.jpg",
				calories: "140",
				ingredients: [
					"Carbonated water",
					"High fructose corn syrup",
					"Caramel color",
					"Phosphoric acid",
					"Natural flavors",
					"Caffeine",
				],
			},
			{
				name: "Orange Juice",
				tag: ["fruit juice", "non-alcoholic"],
				stock: 10,
				price: 3,
				allergens: [],
				img: "./assets/orange-juice.jpg",
				calories: "110",
				ingredients: ["Orange juice"],
			},
			{
				name: "Apple Juice",
				tag: ["fruit juice", "non-alcoholic"],
				stock: 10,
				price: 3,
				allergens: [],
				img: "./assets/apple-juice.jpg",
				calories: "120",
				ingredients: ["Apple juice"],
			},
			{
				name: "Lemonade",
				tag: ["carbonated", "non-alcoholic"],
				stock: 10,
				price: 3,
				allergens: [],
				img: "./assets/lemonade.jpg",
				calories: "100",
				ingredients: ["Lemon juice", "Water", "Sugar"],
			},
			{
				name: "Iced Tea",
				tag: ["beverage", "non-alcoholic"],
				stock: 10,
				price: 3,
				allergens: [],
				img: "./assets/iced-tea.jpg",
				calories: "60",
				ingredients: ["Black tea", "Water", "Sugar", "Lemon"],
			},
			{
				name: "Cucumber & Lime Water",
				tag: ["beverage", "non-alcoholic"],
				stock: 10,
				price: 1,
				allergens: [],
				img: "./assets/water.jpg",
				calories: "0",
				ingredients: ["Cucumber", "Lime", "Water"],
			},
			{
				name: "Mango Smoothie",
				tag: ["smoothie", "non-alcoholic"],
				stock: 10,
				price: 4,
				allergens: [],
				img: "./assets/mango-smoothie.jpg",
				calories: "220",
				ingredients: ["Mango", "Yogurt", "Milk", "Honey"],
			},
			{
				name: "Strawberry Banana Smoothie",
				tag: ["smoothie", "non-alcoholic"],
				stock: 10,
				price: 4,
				allergens: [],
				img: "./assets/strawberry-banana-smoothie.jpg",
				calories: "180",
				ingredients: ["Strawberries", "Banana", "Yogurt", "Milk", "Honey"],
			},
			{
				name: "Chocolate Milkshake",
				tag: ["milkshake", "non-alcoholic"],
				stock: 10,
				price: 5,
				allergens: [],
				img: "./assets/chocolate-milkshake.jpg",
				calories: "420",
				ingredients: [
					"Chocolate ice cream",
					"Milk",
					"Whipped cream",
					"Chocolate syrup",
				],
			},
			{
				name: "Vanilla Milkshake",
				tag: ["milkshake", "non-alcoholic"],
				stock: 10,
				price: 5,
				allergens: [],
				img: "./assets/vanilla-milkshake.jpg",
				calories: "380",
				ingredients: [
					"Vanilla ice cream",
					"Milk",
					"Whipped cream",
					"Vanilla extract",
				],
			},
			{
				name: "Coffee",
				tag: ["hot beverage", "caffeinated"],
				stock: 10,
				price: 3,
				allergens: [],
				img: "./assets/coffee.jpg",
				calories: "5",
				ingredients: ["Coffee beans", "Water"],
			},
			{
				name: "Hot Chocolate",
				tag: ["hot beverage", "non-alcoholic"],
				stock: 10,
				price: 4,
				allergens: [],
				img: "./assets/hot-chocolate.jpg",
				calories: "150",
				ingredients: [
					"Cocoa powder",
					"Milk",
					"Sugar",
					"Whipped cream",
					"Chocolate shavings",
				],
			},
		],
	},
	{
		name: "Starters",
		img: "./assets/starters.jpg",
		items: [
			{
				name: "Chicken Wings",
				tag: ["chicken", "spicy"],
				stock: 10,
				price: 6,
				allergens: ["nut free", "gluten free", "dairy free"],
				cal: 400,
				img: "./assets/chicken-wings.jpg",
				ingredients: ["Chicken wings", "Hot sauce", "Salt", "Pepper"],
			},
			{
				name: "Mozzarella Sticks",
				tag: ["vegetarian"],
				stock: 10,
				price: 5,
				allergens: ["nut free"],
				cal: 300,
				img: "./assets/mozzarella-sticks.jpg",
				ingredients: [
					"Mozzarella cheese sticks",
					"Breadcrumbs",
					"Eggs",
					"Flour",
					"Marinara sauce",
				],
			},
			{
				name: "Garlic Bread",
				tag: ["vegetarian"],
				stock: 10,
				price: 4,
				allergens: ["nut free"],
				cal: 300,
				img: "./assets/garlic-bread.jpg",
				ingredients: ["Baguette", "Garlic", "Butter", "Parsley", "Salt"],
			},
			{
				name: "Onion Rings",
				tag: ["vegetarian", "vegan"],
				stock: 10,
				price: 4,
				allergens: ["nut free", "dairy free"],
				cal: 300,
				img: "./assets/onion-rings.jpg",
				ingredients: ["Onions", "Flour", "Baking powder", "Salt", "Milk"],
			},
			{
				name: "Bruschetta",
				tag: ["vegetarian", "vegan"],
				stock: 10,
				price: 5,
				allergens: ["nut free", "dairy free"],
				cal: 300,
				img: "./assets/bruschetta.jpg",
				ingredients: ["Baguette", "Tomatoes", "Garlic", "Basil", "Olive oil"],
			},
			{
				name: "Shrimp Cocktail",
				tag: ["shrimp", "seafood"],
				stock: 10,
				price: 7,
				allergens: ["nut free", "gluten free", "dairy free"],
				cal: 300,
				img: "./assets/shrimp-cocktail.jpg",
				ingredients: ["Shrimp", "Cocktail sauce", "Lemon", "Lettuce"],
			},
			{
				name: "Caprese Salad",
				tag: ["vegetarian"],
				stock: 10,
				price: 6,
				allergens: ["nut free", "gluten free"],
				cal: 200,
				img: "./assets/caprese-salad.jpg",
				ingredients: [
					"Tomatoes",
					"Mozzarella cheese",
					"Basil",
					"Balsamic glaze",
					"Salt",
				],
			},
			{
				name: "Spinach Artichoke Dip",
				tag: ["vegetarian", "vegan"],
				stock: 10,
				price: 6,
				allergens: ["nut free", "gluten free"],
				cal: 300,
				img: "./assets/spinach-artichoke-dip.jpg",
				ingredients: [
					"Spinach",
					"Artichoke hearts",
					"Cream cheese",
					"Sour cream",
					"Parmesan cheese",
				],
			},
			{
				name: "Crispy Calamari",
				cal: 300,
				tag: [],
				stock: 10,
				ingredients: ["calamari rings", "flour", "spices", "lemon wedges"],
				price: 10,
				allergens: ["nut free", "gluten free"],
				img: "./assets/starters-calamari.jpg",
			},
		],
	},
	{
		name: "Mains",
		img: "./assets/mains.jpeg",
		items: [
			{
				name: "Grilled Salmon",
				cal: 400,
				tag: [],
				stock: 10,
				ingredients: [
					"salmon fillet",
					"lemon",
					"dill",
					"olive oil",
					"salt",
					"pepper",
				],
				price: 15,
				allergens: ["nut free", "gluten free", "dairy free"],
				img: "./assets/mains-grilled-salmon.jpg",
			},
			{
				name: "Mixed Grill",
				cal: 2100,
				tag: [],
				stock: 10,
				ingredients: [
					"pork",
					"lamb",
					"beef",
					"sausage",
					"egg",
					"black pudding",
					"chips",
					"salad",
					"tomato",
					"mushroom",
					"gammon",
				],
				price: 20,
				allergens: ["nut free"],
				img: "./assets/mains-grilled-salmon.jpg",
			},
			{
				name: "Beef Burger",
				cal: 500,
				tag: [],
				stock: 10,
				ingredients: [
					"beef patty",
					"brioche bun",
					"lettuce",
					"tomato",
					"onion",
					"cheese",
					"pickles",
				],
				price: 12,
				allergens: ["nut free"],
				img: "./assets/mains-beef-burger.jpg",
			},
			{
				name: "Vegetable Stir-Fry",
				cal: 300,
				tag: ["vegetarian", "vegan"],
				stock: 10,
				ingredients: [
					"mixed vegetables",
					"tofu",
					"soy sauce",
					"ginger",
					"garlic",
					"sesame oil",
				],
				price: 10,
				allergens: ["nut free", "gluten free"],
				img: "./assets/mains-vegetable-stir-fry.jpg",
			},
			{
				name: "Chicken Parmesan",
				cal: 450,
				tag: [],
				stock: 10,
				ingredients: [
					"chicken breast",
					"bread crumbs",
					"Parmesan cheese",
					"marinara sauce",
					"mozzarella cheese",
					"spaghetti",
				],
				price: 14,
				allergens: ["nut free"],
				img: "./assets/mains-chicken-parmesan.jpg",
			},
			{
				name: "Pesto Pasta",
				cal: 380,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"penne pasta",
					"basil pesto",
					"cherry tomatoes",
					"pine nuts",
					"Parmesan cheese",
				],
				price: 11,
				allergens: [],
				img: "./assets/mains-pesto-pasta.jpg",
			},
			{
				name: "Shrimp Scampi",
				cal: 320,
				tag: [],
				stock: 10,
				ingredients: [
					"shrimp",
					"breadcrumbs",
					"lemon",
					"tartare",
					"chips",
					"salad",
					"parsley",
				],
				price: 16,
				allergens: ["nut free", "dairy free"],
				img: "./assets/mains-shrimp-scampi.jpg",
			},
			{
				name: "Mushroom Risotto",
				cal: 380,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"arborio rice",
					"mushrooms",
					"onion",
					"garlic",
					"vegetable broth",
					"Parmesan cheese",
				],
				price: 13,
				allergens: ["nut free", "gluten free"],
				img: "./assets/mains-mushroom-risotto.jpg",
			},
			{
				name: "Grilled Chicken Caesar Salad",
				cal: 320,
				tag: [],
				stock: 10,
				ingredients: [
					"grilled chicken breast",
					"romaine lettuce",
					"croutons",
					"Parmesan cheese",
					"Caesar dressing",
				],
				price: 9,
				allergens: ["nut free"],
				img: "./assets/mains-chicken-caesar-salad.jpg",
			},
			{
				name: "Beef Stroganoff",
				cal: 480,
				tag: [],
				stock: 10,
				ingredients: [
					"beef sirloin",
					"mushrooms",
					"onion",
					"garlic",
					"sour cream",
					"beef broth",
					"egg noodles",
				],
				price: 15,
				allergens: [],
				img: "./assets/mains-beef-stroganoff.jpg",
			},
			{
				name: "Fish and Chips",
				cal: 550,
				tag: [],
				stock: 10,
				ingredients: [
					"white fish fillets",
					"flour",
					"beer",
					"potatoes",
					"tartar sauce",
					"lemon wedges",
				],
				price: 13,
				allergens: ["nut free", "dairy free"],
				img: "./assets/mains-fish-and-chips.jpg",
			},
			{
				name: "Eggplant Parmesan",
				cal: 420,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"eggplant",
					"bread crumbs",
					"Parmesan cheese",
					"marinara sauce",
					"mozzarella cheese",
					"spaghetti",
				],
				price: 12,
				allergens: ["nut free"],
				img: "./assets/mains-eggplant-parmesan.jpg",
			},
			{
				name: "Lemon Herb Roasted Chicken",
				cal: 400,
				tag: [],
				stock: 10,
				ingredients: [
					"chicken",
					"lemon",
					"rosemary",
					"thyme",
					"garlic",
					"butter",
					"potatoes",
					"carrots",
				],
				price: 16,
				allergens: ["nut free", "gluten free"],
				img: "./assets/mains-lemon-herb-roasted-chicken.jpg",
			},
			{
				name: "Vegetable Lasagna",
				cal: 360,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"lasagna noodles",
					"spinach",
					"mushrooms",
					"zucchini",
					"ricotta cheese",
					"marinara sauce",
					"mozzarella cheese",
				],
				price: 14,
				allergens: ["nut free"],
				img: "./assets/mains-vegetable-lasagna.jpg",
			},
		],
	},
	{
		name: "Desserts",
		img: "./assets/deserts.jpg",
		items: [
			{
				name: "Chocolate Brownie",
				cal: 350,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"chocolate",
					"butter",
					"sugar",
					"eggs",
					"flour",
					"vanilla extract",
					"walnuts",
				],
				price: 8,
				allergens: [],
				img: "./assets/desserts-chocolate-brownie.jpg",
			},
			{
				name: "Cheesecake",
				cal: 450,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"graham cracker crumbs",
					"butter",
					"cream cheese",
					"sugar",
					"sour cream",
					"vanilla extract",
					"eggs",
					"strawberry topping",
				],
				price: 8,
				allergens: ["nut free"],
				img: "./assets/desserts-cheesecake.jpg",
			},
			{
				name: "Vanilla Ice Cream",
				cal: 200,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: ["cream", "sugar", "vanilla extract"],
				price: 6,
				allergens: ["nut free", "gluten free"],
				img: "./assets/desserts-vanilla-ice-cream.jpg",
			},
			{
				name: "Fruit Tart",
				cal: 250,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"pastry dough",
					"pastry cream",
					"strawberries",
					"kiwi",
					"blueberries",
					"apricot glaze",
				],
				price: 10,
				allergens: ["nut free"],
				img: "./assets/desserts-fruit-tart.jpg",
			},
			{
				name: "Tiramisu",
				cal: 320,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"ladyfingers",
					"espresso",
					"mascarpone cheese",
					"sugar",
					"cocoa powder",
					"rum or coffee liqueur",
				],
				price: 9,
				allergens: ["nut free"],
				img: "./assets/desserts-tiramisu.jpg",
			},
			{
				name: "Strawberry Shortcake",
				cal: 280,
				tag: ["vegetarian"],
				stock: 10,
				ingredients: [
					"shortcakes",
					"strawberries",
					"whipped cream",
					"sugar",
					"vanilla extract",
				],
				price: 6,
				allergens: ["nut free"],
				img: "./assets/desserts-strawberry-shortcake.jpg",
			},
		],
	},
];

const App = () => {
	const [selectedKCal, setSelectedKCal] = useState("clear");
	const [selectedDietary, setSelectedDietary] = useState("clear");

	const [toggleGrid, setToggleGrid] = useState(false);

	const [toggleFilters, setToggleFilters] = useState(false);

	const [searchValue, setSearchValue] = useState("");

	// to set up later on
	const [user, setUser] = useState(null);

	// to grab from db later on
	const [receipts, setReceipts] = useState([
		{
			pubName: "The White Lion",
			address: "123 Dove Close, Worcester",
			phone: "+447443350891",
			website: "www.theMightyLionWebsite.com",
			receiptNumber: "SomeCounter",
			dateTime: "2023-06-04 14:30:00",
			year: "2023",
			month: "06",
			items: [
				{
					item: "Avocado on Toast",
					qty: 2,
					price: 9,
					allergens: [],
				},
				{
					item: "Full Breakfast",
					qty: 3,
					price: 10,
					allergens: [],
				},
			],
			vat: 8.1,
			totalAmount: 48,
			paymentMethod: "Credit Card",
			cardNumber: "**** **** **** 1234",
		},
		{
			pubName: "The White Lion",
			address: "123 Dove Close, Worcester",
			phone: "+447443350891",
			website: "www.theMightyLionWebsite.com",
			receiptNumber: "SomeCounter",
			dateTime: "2023-06-04 11:30:00",
			year: "2023",
			month: "06",
			items: [
				{
					item: "Avocado on Toast",
					qty: 2,
					price: 9,
					allergens: [],
				},
				{
					item: "Full Breakfast",
					qty: 3,
					price: 10,
					allergens: [],
				},
			],
			vat: 8.0,
			totalAmount: 48,
			paymentMethod: "Credit Card",
			cardNumber: "**** **** **** 1234",
		},
		{
			pubName: "The White Lion",
			address: "123 Dove Close, Worcester",
			phone: "+447443350891",
			website: "www.theMightyLionWebsite.com",
			receiptNumber: "SomeCounter",
			dateTime: "2023-03-04 14:30:00",
			year: "2023",
			month: "03",
			items: [
				{
					item: "Avocado on Toast",
					qty: 2,
					price: 9,
					allergens: [],
				},
				{
					item: "Full Breakfast",
					qty: 3,
					price: 10,
					allergens: [],
				},
			],
			vat: 8.0,
			totalAmount: 48,
			paymentMethod: "Credit Card",
			cardNumber: "**** **** **** 1234",
		},
		{
			pubName: "The White Lion",
			address: "123 Dove Close, Worcester",
			phone: "+447443350891",
			website: "www.theMightyLionWebsite.com",
			receiptNumber: "SomeCounter",
			dateTime: "2022-06-04 14:30:00",
			year: "2022",
			month: "06",
			items: [
				{
					item: "Avocado on Toast",
					qty: 2,
					price: 9,
					allergens: [],
				},
				{
					item: "Full Breakfast",
					qty: 3,
					price: 10,
					allergens: [],
				},
			],
			vat: 8.0,
			totalAmount: 48,
			paymentMethod: "Credit Card",
			cardNumber: "**** **** **** 1234",
		},
	]);

	// to grab from db later on
	const [basketItems, setBasketItems] = useState([
		{ item: "Avocado on Toast", qty: 2, course: 1 },
		{ item: "Full Breakfast", qty: 3, course: 2 },
		{ item: "Mixed Grill", qty: 3, course: 2 },
		{ item: "Porridge", qty: 1, course: 3 },
	]);
	const [basketQty, setBasketQty] = useState(0);

	const calculateTotalQuantity = () => {
		const totalQty = basketItems.reduce(
			(total, item) => total + parseInt(item.qty),
			0,
		);
		setBasketQty(totalQty);
	};

	useEffect(() => {
		calculateTotalQuantity();
	}, [user, basketItems]);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout user={user} updateUser={setUser} basketQty={basketQty} />
				}>
				<Route
					path="/"
					element={
						user ? (
							<Home
								user={user}
								menuitems={menuitems}
								toggleGrid={toggleGrid}
								setToggleGrid={setToggleGrid}
								toggleFilters={toggleFilters}
								setToggleFilters={setToggleFilters}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								selectedKCal={selectedKCal}
								setSelectedKCal={setSelectedKCal}
								selectedDietary={selectedDietary}
								setSelectedDietary={setSelectedDietary}
							/>
						) : (
							<Auth user={user} setUser={setUser} />
						)
					}>
					{menuitems.map((category, index) => (
						<Route
							key={index}
							path={category.name}
							element={<MenuItem item={category} />}>
							{category.items.map((item, itemIndex) => (
								<Route
									key={itemIndex}
									path={item.name}
									element={
										<MenuItemDetails
											menuitems={menuitems}
											item={item}
											basketItems={basketItems}
											setBasketItems={setBasketItems}
										/>
									}
								/>
							))}
						</Route>
					))}
				</Route>
				<Route
					path="/Receipts"
					element={<Receipts user={user} receipts={receipts} />}
				/>
				<Route
					path="/Basket"
					element={
						<Basket
							user={user}
							menuitems={menuitems}
							basketItems={basketItems}
							setBasketItems={setBasketItems}
						/>
					}
				/>
				<Route path="/Settings" element={<Settings user={user} />} />
				<Route
					path="/Signout"
					element={<Signout user={user} setUser={setUser} />}
				/>

				<Route path="*" element={<Page404 />} />
			</Route>
		</Routes>
	);
};

export default App;
