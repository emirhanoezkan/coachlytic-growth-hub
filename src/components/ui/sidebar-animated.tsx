
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "animate">) => {
  const { open, setOpen, animate } = useSidebar();
  
  return (
    <motion.div
      className={cn(
        "h-full px-3 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "280px" : "60px") : "280px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props as any}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-12 px-4 py-2 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full border-b border-neutral-200 dark:border-neutral-700 z-40"
        )}
      >
        <div className="flex justify-between items-center z-20 w-full">
          <div className="font-display flex space-x-2 items-center text-sm">
            <div className="h-4 w-5 bg-forest-500 dark:bg-lavender-400 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <span className="font-medium text-forest-600 dark:text-white whitespace-pre text-sm">
              Coachlytic
            </span>
          </div>
          <Menu
            className="text-neutral-800 dark:text-neutral-200 cursor-pointer h-5 w-5"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-4 z-[100] flex flex-col",
                className
              )}
              {...props as any}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="font-display flex space-x-2 items-center text-base">
                  <div className="h-5 w-6 bg-forest-500 dark:bg-lavender-400 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
                  <span className="font-medium text-forest-600 dark:text-white">
                    Coachlytic
                  </span>
                </div>
                <X
                  className="text-neutral-800 dark:text-neutral-200 cursor-pointer h-6 w-6"
                  onClick={() => setOpen(!open)}
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate, setOpen } = useSidebar();
  
  const handleClick = () => {
    // Close mobile sidebar when link is clicked
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };
  
  return (
    <Link
      to={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2.5 px-2 rounded-md transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700 text-sm",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {link.icon}
      {animate ? (
        open ? (
          <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
            {link.label}
          </span>
        ) : null
      ) : (
        <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
          {link.label}
        </span>
      )}
    </Link>
  );
};
