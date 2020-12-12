import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import LoadingBox from "../../components/loading/LoadingBox";

const Filters = ({ filters, setFilters }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value, search: "" });
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value.toLowerCase() });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        {loading ? (
          <LoadingBox />
        ) : (
          <select
            name="category"
            value={filters.category}
            onChange={handleChangeSelect}
          >
            <option value="">All Products</option>
            {categories.map((category) => {
              return (
                <option value={"category=" + category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        )}
      </div>

      <input
        name="search"
        type="text"
        value={filters.search}
        placeholder="Ingrese su busqueda"
        onChange={handleChangeInput}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select name="sort" value={filters.sort} onChange={handleChangeSelect}>
          <option value="">Articulos mas nuevos</option>
          <option value="sort=createdAt">Articulos mas antiguos</option>
          <option value="sort=-sold">Articulos mas vendidos</option>
          <option value="sort=-price">Precios: Altos-Bajos</option>
          <option value="sort=price">Precios: Bajos-Altos</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
