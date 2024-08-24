import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productsData } from "../../Reducers/productsInfoSlice";
import { getCategoriesAndDocuments } from "../../Utils/utils";
import Categories from "../../Components/Categories";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = async () => {
    let result = await getCategoriesAndDocuments();
    dispatch(productsData(result));
  };

  return (
    <>
      <Categories />
    </>
  );
};

export default HomePage;
