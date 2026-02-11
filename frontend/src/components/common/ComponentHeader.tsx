import { ReactNode } from 'react';

interface ComponentHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function ComponentHeader({ title, description, children }: ComponentHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      {children}
    </div>
  );
}