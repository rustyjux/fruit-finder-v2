import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  
  export default function Welcome({ isWelcomeVisible, setIsWelcomeVisible }) {
  
    return (
      <Dialog open={isWelcomeVisible} onOpenChange={setIsWelcomeVisible} modal={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rossland Fruit Finder (Alpha Test)</DialogTitle>
            <DialogDescription>
              {`Keen to pick some local fruit🍎🍏? Know where public fruit trees are around Rossland?
              Or have a tree on your property to share? This app is a collaborative tool to help make 
              the most of the abundance of local fruit and reduce human-wildlife conflicts.`}
              <br/><br/>
              But wait - first we need to test the app!
              <br/><br/>
              Open the <a href="https://docs.google.com/forms/d/e/1FAIpQLSeSjCAmA1M2xlyQvVMXsekVkdCthnfbQoGjj4wm-qR8u5IAaw/viewform?usp=sf_link" style={{color: '#007bff', textDecoration: 'underline'}}>feedback form</a> to get started.
              The app is designed for <b>mobile</b> devices, but you may prefer to complete the form on a computer.
              <br/><br/>
              Thanks for your support! ♥
              <br/><br/>
              <Button onClick={() => setIsWelcomeVisible(false)}>Got it!</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  