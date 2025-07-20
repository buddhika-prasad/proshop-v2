const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-300">ProShop &copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
