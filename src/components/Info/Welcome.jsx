import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  
  export default function Welcome({ isWelcomeVisible, setIsWelcomeVisible }) {
  
    return (
      <Dialog open={isWelcomeVisible} onOpenChange={setIsWelcomeVisible} modal={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rossland Fruit Finder</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="welcome" className="pb-2">
                <TabsList className="flex my-2">
                  <TabsTrigger value="welcome">Welcome</TabsTrigger>
                  <TabsTrigger value="tutorial">How it works</TabsTrigger>
                </TabsList>
                <TabsContent value="welcome">
                  Keen to pick some local fruit🍎🍏? Know where public fruit trees are around Rossland?
                  Or have a tree on your property to share? 
                  <br/><br/>
                  The Rossland Fruit Finder app is a collaborative tool to help make 
                  the most of the abundance of local fruit and reduce human-wildlife conflicts.
                  <br/><br/>
                  This app is designed for <b>mobile</b> devices. Jump on your phone for the best experience!
                </TabsContent>
                <TabsContent value="tutorial">
                  🚧 Coming soon!
                  <br/><br/>
                  In the meantime, feel free to contribute to the map by adding fruit trees (either public or your own private trees) to the map.
                </TabsContent>
              </Tabs>
              <Button onClick={() => setIsWelcomeVisible(false)}>Got it!</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  