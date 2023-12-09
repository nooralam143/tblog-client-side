import RecentPost from "../Pages/RecentPost";
import Review from "../Pages/Review";
import { Carousel } from 'flowbite-react';
import Slidder from "../Pages/Slidder";
import SidebarComponent from "../Pages/SidebarComponent";



const Home = () => {

    return (
        <div>
            
            <div className="flex">
            <div className="hidden md:block lg:block">
            <SidebarComponent></SidebarComponent>
            </div>
            <div className="flex-grow">
            <Slidder></Slidder>
            <RecentPost></RecentPost>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
               
               <Carousel>
                   <div className="flex h-full items-center justify-center  dark:bg-gray-700 dark:text-white">
                       <Review></Review>
                   </div>
                   <div className="flex h-full items-center justify-center  dark:bg-gray-700 dark:text-white">
                       <Review></Review>
                   </div>
                   <div className="flex h-full items-center justify-center  dark:bg-gray-700 dark:text-white">
                       <Review></Review>
                   </div>
               </Carousel>
           </div>
            </div>    
           </div>
           </div>

    );
};

export default Home;