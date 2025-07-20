import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center mt-8">
        <div className="flex space-x-1">
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={
                isAdmin
                  ? `/admin/productlist/${x + 1}`
                  : keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
              }
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                x + 1 === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {x + 1}
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default Paginate;
