import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CarouselDots from "@/components/ui/carouseldots";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/utils/helpers";
import FullPageDialog from '../ui/full-page-dialog';
import { FaAppleAlt, FaMap, FaRegCircle, FaPlus, FaInfo } from 'react-icons/fa';
import { FaPerson, FaPencil } from 'react-icons/fa6';
import { RiBearSmileFill } from "react-icons/ri";
import AddTreeButton from '../App/AddTreeButton';
import ButtonShell from '../ui/button-shell';

export default function Welcome({ isWelcomeVisible, setIsWelcomeVisible }) {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const [hideOnStart, setHideOnStart] = useState(false);

  const showHideUserSetting = localStorage.getItem('hideWelcome')

  useEffect(() => {
    if (!showHideUserSetting) {
      setTimeout(() => {
        // check the input checkbox
        const checkbox = document.getElementById('hideOnStart');
        checkbox.checked = true;
        localStorage.setItem('hideWelcome', true);
      }, 100);
    }
  }, []);
  
  useEffect(() => {
    const hideWelcome = localStorage.getItem('hideWelcome') === 'true';
    if (hideWelcome) {
      setIsWelcomeVisible(false);
      setHideOnStart(hideWelcome);
    }
  }, [setIsWelcomeVisible]);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setHideOnStart(isChecked);
    localStorage.setItem('hideWelcome', isChecked);
  };

  return (
    <FullPageDialog open={isWelcomeVisible} onOpenChange={setIsWelcomeVisible}>
        {/* <DialogHeader>
          <DialogTitle>Rossland Fruit Finder</DialogTitle>
        </DialogHeader> */}
        <div className="flex items-center justify-center h-full">
          <Carousel className="w-full">
            <CarouselContent className="pb-2 text-center flex">
              <CarouselItem>
                <div className='text-6xl flex justify-center pb-4'>
                  <FaAppleAlt />
                  <FaPerson/>
                  <RiBearSmileFill />
                </div>
                <span className='onboarding-heading'>Welcome to Fruit Finder</span>
                <br /><br />
                Help make the most of local fruit and reduce human-wildlife conflicts.
                <br /><br />
                Continue to learn how to use the app.
                {isDesktop ? (
                  <span>
                    <br /><br />
                    This app is designed for <b>mobile</b> devices. Jump on your phone for the best experience!
                  </span>
                ) : ""}
              </CarouselItem>
              <CarouselItem>
                <div className='text-6xl flex justify-center pb-4'>
                  <FaMap />
                </div>
                <span className='onboarding-heading'>Explore the map</span>
                <br /><br />
                Pan, zoom, and jump to your location.
              </CarouselItem>
              <CarouselItem>
                <div className='text-6xl flex justify-center pb-4'>
                  {/* <FaRegCircle className='text-[#008119]' /> */}
                  <FaRegCircle />
                </div>
                <span className='onboarding-heading'>Find trees to pick</span>
                <br /><br />
                Tap a tree to find out more about it.
                <br /><br />
                Ask permission before picking trees
                on private property.
              </CarouselItem>
              <CarouselItem>
                <div className='text-6xl flex justify-center pb-4'>
                  <FaPlus />
                </div>
                <span className='onboarding-heading'>Share trees</span>
                <br /><br />
                Add your own trees to the map and share them with others.
              </CarouselItem>
              <CarouselItem>
                <div className='text-6xl flex justify-center pb-4'>
                  <FaPencil />
                </div>
                <span className='onboarding-heading'>Improve the map</span>
                <br /><br />
                Edit or remove trees to correct inaccurate info.              
              </CarouselItem>
              <CarouselItem>
                <div className='text-6xl flex justify-center pb-4'>
                  <FaInfo />
                </div>
                <span className='onboarding-heading'>Learn more</span>
                <br /><br />
                Find out more about the app and how to use it at the {' '}
                  <a href="https://rosslandsustainability.com/rossland-fruit-finder/" 
                    target="_blank" 
                    className="text-blue-500 hover:text-blue-700 underline">
                    Fruit Finder website
                  </a>.
              </CarouselItem>
            </CarouselContent>
            <div className="flex items-center justify-center mt-auto p-4">
              {/* <CarouselPrevious /> */}
              {/* <CarouselNext /> */}
              <CarouselDots />
            </div>
          </Carousel>
        </div>
        <div className="absolute left-0 bottom-6 w-full px-6">
          <div className='flex-col items-center justify-center w-full'>
            <Button onClick={() => setIsWelcomeVisible(false)} className="flex w-full">Let's go</Button>
            <div className="flex items-center justify-center mt-4">
              <input
                type="checkbox"
                id="hideOnStart"
                checked={hideOnStart}
                onChange={handleCheckboxChange}
                className="mr-2"
                />
              <label htmlFor="hideOnStart" className='text-sm'>Hide on app start</label>
            </div>
          </div>
        </div>
    </FullPageDialog>
  );
}
