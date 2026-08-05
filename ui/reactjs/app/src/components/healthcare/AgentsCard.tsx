import {
Card,
CardContent,
Typography,
Grid,
Chip
} from "@mui/material";


interface Props{

data:any;

}



export default function AgentsCard({
data
}:Props){


if(!data)
return null;



return (

<Card
sx={{
m:3,
borderRadius:3,
boxShadow:3
}}
>


<CardContent>


<Typography
variant="h5"
fontWeight="bold"
>
👥 Available Agents
</Typography>



<Typography
sx={{mb:2}}
>
Total Agents : {data.total_agents}
</Typography>



<Grid
container
spacing={2}
>


{
data.agents.map(
(agent:any,index:number)=>(


<Grid
xs={12}
md={6}
key={index}
>


<Card
variant="outlined"
>


<CardContent>


<Typography
variant="h6"
>
{agent.name}
</Typography>



<Chip

label={agent.role}

color="primary"

sx={{
mt:1
}}

/>


</CardContent>


</Card>


</Grid>


))

}



</Grid>


</CardContent>


</Card>

);

}