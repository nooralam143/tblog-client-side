import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useContext } from 'react';
import { AuthContext } from './../providers/AuthProvider';
import { Link, NavLink } from 'react-router-dom';
import "../Navbar/Nabar.css"

const NavbarComponent = () => {
  const { user, logOut } = useContext(AuthContext);

console.log(user);
  const handalSignout = () => {
    logOut()
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      })
  }
  return (
    <Navbar fluid rounded>
      <Link href="/" className='flex'>
        <img src="/tblogo.svg" className="mr-3 h-6 sm:h-9" alt="TBlog Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TBlog</span>
      </Link>
      <div className="flex md:order-2">
        {
          user ?
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img={user.photoURL} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.displayName}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item><button onClick={handalSignout}>Sign out</button></Dropdown.Item>
              </Dropdown>
            </>
            :

            <Link to="/login">
              <button className="btn btn-sm h-10 pr-1">Login/Register</button>
            </Link>

        }
        <Navbar.Toggle />
      </div>


      <Navbar.Collapse>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/add-blog">Add Blog</NavLink></li>
          <li><NavLink to="/all-blog">All blogs</NavLink></li>
          <li><NavLink to="/featured-blogs">Featured Blogs</NavLink></li>
          <li><NavLink to="/wishlist">Wishlist</NavLink></li>

      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavbarComponent;