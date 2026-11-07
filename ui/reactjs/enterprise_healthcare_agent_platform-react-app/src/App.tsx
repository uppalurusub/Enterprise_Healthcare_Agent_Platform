import {useState} from "react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";

import Dashboard from "./pages/Dashboard";


export default function App(){


const [
selectedMenu,
setSelectedMenu
]=useState("dashboard");



return (

<>

<Header/>


<div
style={{
display:"flex",
minHeight:"70vh"
}}
>


<Sidebar
onMenuSelect={setSelectedMenu}
/>



<Dashboard
selectedMenu={selectedMenu}
/>


</div>


<Footer/>


</>

);

}