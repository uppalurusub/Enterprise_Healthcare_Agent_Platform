import {
    Button,
    Stack,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import GroupsIcon from "@mui/icons-material/Groups";


interface SidebarProps {

    onMenuSelect:(menu:string)=>void;

    selectedMenu?:string;

}



export default function Sidebar({
    onMenuSelect,
    selectedMenu

}:SidebarProps){



const menuItems=[

    {
        id:"dashboard",
        label:"Platform Analysis",
        icon:<DashboardIcon/>
    },

    {
        id:"health",
        label:"Health",
        icon:<HealthAndSafetyIcon/>
    },

    {
        id:"agents",
        label:"Agents",
        icon:<GroupsIcon/>
    },

    {
        id:"agents-info",
        label:"Agents Info",
        icon:<GroupsIcon/>
    }

];



return (

<div
style={{
    width:240,
    padding:20
}}
>


<Typography
variant="h6"
fontWeight="bold"
sx={{
    mb:3
}}
>
Healthcare Platform
</Typography>



<Stack spacing={2}>


{
menuItems.map((item)=>(


<Button

key={item.id}

variant={
selectedMenu===item.id
?
"contained"
:
"outlined"
}


startIcon={item.icon}


onClick={()=>onMenuSelect(item.id)}


sx={{

justifyContent:"flex-start",

textTransform:"none",

fontSize:"16px",

padding:"12px 20px",

borderRadius:"10px"

}}


>

{item.label}


</Button>


))

}


</Stack>


</div>

);

}