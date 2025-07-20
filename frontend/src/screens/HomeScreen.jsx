import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { FaArrowLeft } from "react-icons/fa";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductCarousel />

      <div className="container mx-auto px-4 py-8">
        {keyword && (
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-6"
          >
            <FaArrowLeft className="text-sm" />
            <span>Go Back</span>
          </Link>
        )}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Meta title="Hello" />
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Latest Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>

            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={data.keyword ? data.keyword : ""}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
