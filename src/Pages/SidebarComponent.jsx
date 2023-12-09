import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiInbox, HiTable, HiViewBoards } from 'react-icons/hi';
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import axios from 'axios';
import { serverURL } from '../config';
import { useQuery } from '@tanstack/react-query';

function SidebarComponent() {
  const fetchData = async () => {
    const response = await axios.get(`${serverURL}/post`);
  
    return response.data;
  };
    
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
    config: {
      refetchInterval: 1000,
      cacheTime: 60000,
    },
  });


  const { user } = useContext(AuthContext);
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Sidebar.Item href="/all-blog" icon={HiInbox}>
          All Blogs
          </Sidebar.Item>
          {/* <Sidebar.Item href="all-blog" icon={HiChartPie}>
            All Blogs
          </Sidebar.Item> */}
          <Sidebar.Item href="/wishlist" icon={HiViewBoards} label="Pro" labelColor="dark">
          wishlist
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item> */}
      {
        !user ?
        <>
        <Sidebar.Item href="/login" icon={HiArrowSmRight}>
        Sign In
      </Sidebar.Item>
      <Sidebar.Item href="/register" icon={HiTable}>
        Sign Up
      </Sidebar.Item>
        </>
        :
        ''
      }
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default SidebarComponent;