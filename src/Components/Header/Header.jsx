import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className="headerTitles absolute mt-[150px] ml-[90px]">
                <span className='text-[5rem] font-bold text-white'>React & Node Blog</span>
            </div>
            <img className='headerImg' src="https://img.freepik.com/premium-photo/flowers-grass-nature-blur-background_33807-1560.jpg?w=900" alt="" />
        </div>
    );
};

export default Header;