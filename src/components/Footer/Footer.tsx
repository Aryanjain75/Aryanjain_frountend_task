// components/Footer.tsx
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 body-font">
      <div className="container px-5 py-4 mx-auto flex items-center justify-between">
        <span className="text-sm text-gray-500">
          © 2024 SHŌDEN Ltd. All Rights Reserved          
        </span>
        <div className="flex space-x-4">
        <Link href="/">
            <div className="text-gray-500 hover:text-gray-900">Terms of Service</div>
          </Link>
          <Link href="/">
            <div className="text-gray-500 hover:text-gray-900">Privacy Policy</div>
          </Link>
          
          <Link href="/">
            <div className="text-gray-500 hover:text-gray-900">Content Policy</div>
          </Link>
        </div>
        <div className="flex space-x-3">
          <Link href="https://twitter.com">
            <div className="border-2 w-8 h-8 rounded-full items-center justify-center flex border-[#E2E8F0] bg-gradient-to-r from-[#8C57EA] to-[#5570E8] text-transparent bg-clip-text hover:text-gray-900" >
            <i className="fa-brands fa-x-twitter"></i>
            </div>
          </Link>
          <Link href="https://instagram.com">
            <div className="border-2 w-8 h-8 rounded-full items-center justify-center flex border-[#E2E8F0] bg-gradient-to-r from-[#8C57EA] to-[#5570E8] text-transparent bg-clip-text hover:text-gray-900" >
            <i className="fa-brands fa-instagram"></i>
                        </div>
          </Link>
          <Link href="https://linkdin.com">
            <div className="border-2 w-8 h-8 rounded-full items-center justify-center flex border-[#E2E8F0] bg-gradient-to-r from-[#8C57EA] to-[#5570E8] text-transparent bg-clip-text hover:text-gray-900" >
            <i className="fa-brands fa-linkedin-in"></i>
        </div>
          </Link>
          <Link href="https://Gmail.com">
          <div className="border-2 w-8 h-8 rounded-full items-center justify-center flex border-[#E2E8F0] bg-gradient-to-r from-[#8C57EA] to-[#5570E8] text-transparent bg-clip-text hover:text-gray-900">
          <i className="fa-solid fa-envelope"></i>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
