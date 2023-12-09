import { Avatar, Blockquote, Rating } from 'flowbite-react';

const Review = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl mb-4'>Review:</h1>
      <figure className="mb-8">
        <div className="mb-4 flex items-center">
          <Rating size="md">
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
          </Rating>
        </div>
        <Blockquote>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
            " The tech blog provides detailed, well-researched articles on various tech topics. It caters to both tech enthusiasts and beginners, covering a wide range of subjects from AI, quantum computing, to blockchain. While content is enriching, additional multimedia content could enhance the reading experience"
          </p>
        </Blockquote>
        <figcaption className="mt-6 flex items-center space-x-3">
          <Avatar rounded size="xs" img="https://i.ibb.co/F8YDjJL/download.jpg" alt="profile picture" />
          <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
            <cite className="pr-3 font-medium text-gray-900 dark:text-white">Bonnie Green</cite>
            <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">CTO at Flowbite</cite>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default Review;
