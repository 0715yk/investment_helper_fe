// components/HamburgerMenu.tsx
import { useState } from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* 햄버거 버튼 */}
      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none text-white"
      >
        {/* 햄버거 아이콘 */}
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200">
          <ul className="py-1">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                Main Page
              </Link>
            </li>
            <li>
              <Link
                href="/coin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                Coin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
