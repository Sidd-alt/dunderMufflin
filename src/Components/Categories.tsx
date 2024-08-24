import { useSelector } from "react-redux";
import { Grid, Paper, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          width: "200px",
          margin: "10px",
        },
      },
    },
  },
});

interface ProductData {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductData> = ({ id, imageUrl, name, price }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={imageUrl} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price - ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const Categories: React.FC = () => {
  const data = useSelector((state) => state?.productsInfo?.products);
  const categories = Object.keys(data);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productsData, setProductsData] = useState<Array<ProductData>>();

  const handleSelectCard = (item: string) => {
    setSelectedCategory(item);
    console.log(data[item]);
    setProductsData(data[item]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container m={"10px 0px"} flexDirection={"column"}>
        <Grid
          item
          display={"flex"}
          justifyContent={"space-evenly"}
          flexWrap={"wrap"}
        >
          {categories.map((item) => (
            <Paper
              key={item}
              onClick={() => handleSelectCard(item)}
              style={{
                background: `${selectedCategory === item ? "black" : "white"}`,
              }}
              variant="outlined"
            >
              <Typography
                style={{
                  color: `${selectedCategory === item ? "white" : "black"}`,
                }}
                textAlign={"center"}
                p={"15px"}
                variant="h4"
              >
                {item}
              </Typography>
            </Paper>
          ))}
        </Grid>
        <Grid
          item
          display={"flex"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          alignItems={"flex-start"}
        >
          {productsData?.map(({ id, imageUrl, name, price }) => (
            <ProductCard
              key={id}
              id={id}
              name={name}
              imageUrl={imageUrl}
              price={price}
            />
          ))}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Categories;
