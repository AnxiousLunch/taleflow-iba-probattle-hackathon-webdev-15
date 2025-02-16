import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={`rounded-lg border p-4 shadow ${className}`} {...props} />;
}
