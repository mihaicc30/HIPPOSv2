import React, { useState, useEffect } from "react";
import "./App.css";
import { auth, db, logout } from "./firebase/config.jsx";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Routes,
  Route,
  Outlet,
  NavLink,
  BrowserRouter,
} from "react-router-dom";

// Routes
import MenuItem from "./comp/home/MenuItem";
import MenuItemDetails from "./comp/home/MenuItemDetails";
import Home from "./comp/home/Home";
import Auth from "./comp/isAuth/Auth";
import Layout from "./comp/isAuth/Layout";
import Receipts from "./comp/Receipts/Receipts";
import Signout from "./comp/signout/Signout";
import Basket from "./comp/basket/Basket";
import Payment from "./comp/basket/Payment";
import PaymentComplete from "./comp/basket/PaymentComplete";
import Page404 from "./comp/Page404";
import Settings from "./comp/Settings/Settings";
import Contact from "./comp/Settings/Contact";
import FAQ from "./comp/Settings/Faq";
import Notifications from "./comp/Settings/Notifications";
import News from "./comp/Settings/News";
import Privacy from "./comp/Settings/Privacy";
import Symbol from "./comp/Settings/Symbol";
import TC from "./comp/Settings/T&C";

import { getVenueById } from "./utils/BasketUtils";
import { grabProducts } from "./utils/grabProducts";

import { loadStripe } from "@stripe/stripe-js";

const venues = [
  {
    id: 1,
    name: "The White Lion",
    email: "",
    address: "Unit 6, C, Gregory's Mill St, Worcester WR3 8BA",
    phone: "12345 1234 123",
    website: "theawesomelionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    coords: [{ long: "52.191724" }, { lat: "-2.220120" }],
  },
  {
    id: 2,
    name: "The Red Lion",
    email: "",
    address: "Unit 1B, Battery Retail Park, Selly Oak, Birmingham B29 6SJ",
    phone: "12345 1234 123",
    website: "theawesomelionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [1, 2, 3, 4, 5, 6, 7],
    coords: [{ long: "52.171724" }, { lat: "-2.210120" }],
  },
  {
    id: 3,
    name: "The Black Lion",
    email: "",
    address: "Brompton House, Station Rd, Broadway WR12 7DE",
    phone: "12345 1234 123",
    website: "theawesomelionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [15, 16, 17, 18, 19, 20],
    coords: [{ long: "52.161724" }, { lat: "-2.200120" }],
  },
  {
    id: 4,
    name: "The Old Lion Big Name Venue",
    email: "",
    address: "Matson Ln, Matson, Gloucester GL4 6EA",
    phone: "12345 1234 123",
    website: "theawesomelionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [1, 2, 3, 4, 5, 18, 19, 20],
    coords: [{ long: "52.151724" }, { lat: "-2.230120" }],
  },
  {
    id: 5,
    name: "The Blue Lion",
    email: "",
    address: "123 Blue Street, Blueville, BL12 3BL",
    phone: "12345 1234 123",
    website: "thebluelionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [1, 2, 3],
    coords: [{ long: "51.234567" }, { lat: "-1.234567" }],
  },
  {
    id: 6,
    name: "The Green Lion",
    email: "",
    address: "456 Green Road, Greenvale, GR34 5GR",
    phone: "12345 1234 123",
    website: "thegreenlionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [4, 5, 6],
    coords: [{ long: "51.345678" }, { lat: "-1.345678" }],
  },
  {
    id: 7,
    name: "The Yellow Lion",
    email: "",
    address: "789 Yellow Avenue, Yellowtown, YL56 7YL",
    phone: "12345 1234 123",
    website: "theyellowlionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [7, 8, 9],
    coords: [{ long: "51.456789" }, { lat: "-1.456789" }],
  },
  {
    id: 8,
    name: "The Purple Lion",
    email: "",
    address: "987 Purple Close, Purpletown, PT98 7PT",
    phone: "12345 1234 123",
    website: "thepurplelionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [10, 11, 12],
    coords: [{ long: "51.567890" }, { lat: "-1.567890" }],
  },
  {
    id: 9,
    name: "The Orange Lion",
    email: "",
    address: "654 Orange Lane, Orangecity, OC65 4OC",
    phone: "12345 1234 123",
    website: "theorangelionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [13, 14, 15],
    coords: [{ long: "51.678901" }, { lat: "-1.678901" }],
  },
  {
    id: 10,
    name: "The Pink Lion",
    email: "",
    address: "321 Pink Crescent, Pinkville, PK32 1PK",
    phone: "12345 1234 123",
    website: "thepinklionwebsite.co.uk",
    img: "./assets/defaultVenue.jpg",
    table: [16, 17, 18],
    coords: [{ long: "51.789012" }, { lat: "-1.789012" }],
  },
];
// await grabProducts()

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  const [venueNtable, setVenueNtable] = useState({ venue: null, table: null });

  const [menuitems, setMenuitems] = useState([]);
  const [selectedKCal, setSelectedKCal] = useState("clear");
  const [selectedDietary, setSelectedDietary] = useState("clear");
  const [toggleGrid, setToggleGrid] = useState(false);
  const [toggleFilters, setToggleFilters] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [basketQty, setBasketQty] = useState(0);

  const [basketItems, setBasketItems] = useState([]);

  const calculateTotalQuantity = () => {
    const totalQty = basketItems.reduce(
      (total, item) => total + parseInt(item.qty),
      0
    );
    setBasketQty(totalQty);
  };

  useEffect(() => {
    console.log(user);
    async function get() {
      try {
        console.log("Grabbing menu");
        await fetch(`${import.meta.env.VITE_API}grabProducts`, {
          method: "POST",
          headers: {
            
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            v: import.meta.env.VITE_G,
          }),
        }).then(async (results) => {
          const resp = await results.json();
          setMenuitems(resp);
        });
      } catch (error) {
        alert(error.message);
      }
    }
    get();
  }, [user]);

  useEffect(() => {
    calculateTotalQuantity();
  }, [basketItems]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout user={user?.email} basketQty={basketQty} />}
        >
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/menu"
            element={
              <Home
                user={user?.email}
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
                venueNtable={venueNtable}
                setVenueNtable={setVenueNtable}
                venues={venues}
              />
            }
          >
            {menuitems &&
              menuitems.map((category, index) => (
                <Route
                  key={index}
                  path={category.name}
                  element={<MenuItem item={category} />}
                >
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
          <Route path="/receipts" element={<Receipts user={user?.email} />} />
          <Route
            path="/basket"
            element={
              <Basket
                user={user?.email}
                menuitems={menuitems}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
                venueNtable={{
                  venue: getVenueById(venues, venueNtable.venue),
                  table: venueNtable.table,
                }}
                setVenueNtable={setVenueNtable}
              />
            }
          />
          <Route
            path="/payment"
            element={<Payment user={user?.email} basketQty={basketQty} />}
          />
          <Route
            path="/paymentcomplete"
            element={
              <PaymentComplete
                user={user?.email}
                venueNtable={{
                  venue: getVenueById(venues, venueNtable.venue),
                  table: venueNtable.table,
                }}
                menuitems={menuitems}
                venues={venues}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            }
          />
          <Route path="/settings" element={<Settings user={user?.email} />} />

          <Route path="/contact" element={<Contact user={user?.email} />} />
          <Route path="/faq" element={<FAQ user={user?.email} />} />
          <Route
            path="/notifications"
            element={<Notifications user={user?.email} />}
          />
          <Route path="/news" element={<News user={user?.email} />} />
          <Route path="/privacy" element={<Privacy user={user?.email} />} />
          <Route path="/symbol" element={<Symbol user={user?.email} />} />
          <Route path="/t&c" element={<TC user={user?.email} />} />

          <Route path="/signout" element={<Signout />} />

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
