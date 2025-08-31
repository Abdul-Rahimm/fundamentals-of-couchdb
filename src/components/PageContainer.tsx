import { ReactNode } from "react";
import Navbar from "./Navbar";

type PageContainerProps = {
  title: string;
  children: ReactNode;
};

export default function PageContainer({ title, children }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
