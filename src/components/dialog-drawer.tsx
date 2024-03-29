import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function DialogDrawer({
  open,
  onOpenChange,
  title,
  body,
}: {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  title?: string;
  body?: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-secondary">{title}</DialogTitle>
            <DialogDescription>{body}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-start">
          <DrawerTitle className="text-secondary">{title}</DrawerTitle>
          <DrawerDescription>{body}</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
