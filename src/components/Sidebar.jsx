import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { links } from '../assets/constants';
import { logo } from '../assets';
import { HiOutlineMenu } from 'react-icons/hi';

const NavLinks = ({ handleClick }) => (
	<div className='mt-10'>
		{links.map((link) => (
			<NavLink
				key={link.name}
				to={link.to}
				onClick={() => handleClick && handleClick()}
				className='flex justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
			>
				<link.icon className='w-6 h-6 mr-2' />
				{link.name}
			</NavLink>
		))}
	</div>
);

function Sidebar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#14213d]'>
				<div className='w-full flex flex-col items-center'>
					<img
						src={logo}
						alt='logo'
						className='w-full object-contain h-14 mb-2'
					/>
					<h2 className='font-bold text-white text-lg'>Musictify</h2>
				</div>

				<NavLinks />
			</div>
			<div className='absolute md:hidden block top-6 right-3'>
				{mobileMenuOpen ? (
					<RiCloseLine
						className='w-6 h-6 text-white mr-2 hover:cursor-pointer'
						onClick={() => setMobileMenuOpen(false)}
					/>
				) : (
					<HiOutlineMenu
						className='w-6 h-6 text-white mr-2 hover:cursor-pointer'
						onClick={() => setMobileMenuOpen(true)}
					/>
				)}
			</div>
			<div
				className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
					mobileMenuOpen ? 'left-0' : '-left-full'
				}`}
			>
				<div className='w-full flex flex-col items-center'>
					<img
						src={logo}
						alt='logo'
						className='w-full object-contain h-14 mb-2'
					/>
					<h2 className='font-bold text-white text-lg'>Musictify</h2>
				</div>
				<NavLinks handleClick={() => setMobileMenuOpen(false)} />
			</div>
		</>
	);
}

export default Sidebar;
