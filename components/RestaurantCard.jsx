"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const RestaurantCard = ({ restaurant, handleEdit, handleDelete, handleTagClick }) => {
  const userId = localStorage.getItem("userId");
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {

    if (restaurant.userId === userId) return router.push("/profile");

    router.push(`/profile/${restaurant._id}?name=${restaurant.name}`);
  };

  const handleCopy = () => {
    setCopied(restaurant.description);
    navigator.clipboard.writeText(restaurant.description);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src="/assets/images/logo.svg"
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {restaurant.name}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              Contact: {restaurant.contact}
            </p>
            <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(restaurant.location)
          }
        
      >
        Location: {restaurant.location}
        
      </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === restaurant
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === restaurant ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{restaurant.description}</p>

      {userId === restaurant.userId && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
