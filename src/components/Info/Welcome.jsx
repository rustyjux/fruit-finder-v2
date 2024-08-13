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
      console.log('second useEffect');
    }
  }, [setIsWelcomeVisible]);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setHideOnStart(isChecked);
    localStorage.setItem('hideWelcome', isChecked);
  };

  return (
    <FullPageDialog open={isWelcomeVisible} onOpenChange={setIsWelcomeVisible} modal={true} className="h-full">
        <DialogHeader>
          <DialogTitle>Rossland Fruit Finder</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          <Carousel>
            <CarouselContent className="pb-2">
              <CarouselItem>
                Keen to pick some local fruit🍎🍏? Know where public fruit trees are around Rossland?
                Or have a tree on your property to share?
                <br /><br />
                The Rossland Fruit Finder app is a collaborative tool to help make
                the most of the abundance of local fruit and reduce human-wildlife conflicts.
                {isDesktop ? (
                  <span>
                    <br /><br />
                    This app is designed for <b>mobile</b> devices. Jump on your phone for the best experience!
                  </span>
                ) : ""}
              </CarouselItem>
              <CarouselItem>
                🚧 Coming soon!
                <br /><br />
                In the meantime, feel free to contribute to the map by adding fruit trees (either public or your own private trees) to the map.
              </CarouselItem>
              <CarouselItem>
                <div className="flex items-center">
                  <Button onClick={() => setIsWelcomeVisible(false)} className="mr-4">Got it!</Button>
                  <input
                    type="checkbox"
                    id="hideOnStart"
                    checked={hideOnStart}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor="hideOnStart">Hide on app start</label>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bottom-0" />
            <CarouselNext />
            <CarouselDots />
            {/* <CarouselPrevious /> */}



          </Carousel>
        </div>
    </FullPageDialog>
  );
}

          {/* <Tabs defaultValue="welcome" className="pb-2 focus:outline-none">
            <TabsList className="flex my-2">
              <TabsTrigger value="welcome">Welcome</TabsTrigger>
              <TabsTrigger value="tutorial">How it works</TabsTrigger>
            </TabsList>
            <TabsContent value="welcome" className="focus:outline-none">
              Keen to pick some local fruit🍎🍏? Know where public fruit trees are around Rossland?
              Or have a tree on your property to share?
              <br /><br />
              The Rossland Fruit Finder app is a collaborative tool to help make
              the most of the abundance of local fruit and reduce human-wildlife conflicts.
              {isDesktop ? (
                <span>
                  <br /><br />
                  This app is designed for <b>mobile</b> devices. Jump on your phone for the best experience!
                </span>
              ) : ""}
            </TabsContent>
            <TabsContent value="tutorial">
              🚧 Coming soon!
              <br /><br />
              In the meantime, feel free to contribute to the map by adding fruit trees (either public or your own private trees) to the map.
            </TabsContent>
          </Tabs> */}