import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">New to Gharbhada</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:underline">What is Gharbhada?</Link></li>
                            <li><Link to="/about" className="hover:underline">How can I post a room on Gharbhada?</Link></li>
                            <li><Link to="/about" className="hover:underline">What is the process for finding a roommate?</Link></li>
                            <li><Link to="/contact" className="hover:underline">How can I contact Gharbhada for support?</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">About Us</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:underline">About Us</Link></li>
                            <li><Link to="/about" className="hover:underline">Why SpareRoom</Link></li>
                            <li><Link to="/blogs" className="hover:underline">Blog</Link></li>
                            <li><Link to="/terms" className="hover:underline">Terms and Conditions</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Our Services</h3>
                        <ul className="space-y-2">
                            <li><Link to="/search" className="hover:underline">Search</Link></li>
                            <li><Link to="/post" className="hover:underline">Post</Link></li>
                            <li><Link to="/browse" className="hover:underline">Browse</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Contact Us</h3>
                        <ul className="space-y-2">
                            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                            <li><p>Day : Mon-Sat</p></li>
                            <li><Link to="/about" className="hover:underline">FAQs</Link></li>
                            <li className="flex gap-4">
                                <a href="https://youtube.com" className="hover:text-red-500">
                                    <i className="fab fa-youtube fa-2x" aria-hidden="true"></i>
                                </a>
                                <a href="https://instagram.com" className="hover:text-pink-500">
                                    <i className="fab fa-instagram fa-2x" aria-hidden="true"></i>
                                </a>
                                <a href="https://facebook.com" className="hover:text-blue-500">
                                    <i className="fab fa-facebook fa-2x" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} Gharbhada. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
