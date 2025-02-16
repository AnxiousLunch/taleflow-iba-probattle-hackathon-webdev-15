import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export function Tabs({ children, ...props }: TabsPrimitive.TabsProps) {
  return <TabsPrimitive.Root {...props}>{children}</TabsPrimitive.Root>;
}

export function TabsList({ children, ...props }: TabsPrimitive.TabsListProps) {
  return <TabsPrimitive.List className="flex border-b" {...props}>{children}</TabsPrimitive.List>;
}

export function TabsTrigger({ children, ...props }: TabsPrimitive.TabsTriggerProps) {
  return <TabsPrimitive.Trigger className="px-4 py-2" {...props}>{children}</TabsPrimitive.Trigger>;
}

export function TabsContent({ children, ...props }: TabsPrimitive.TabsContentProps) {
  return <TabsPrimitive.Content className="p-4" {...props}>{children}</TabsPrimitive.Content>;
}
