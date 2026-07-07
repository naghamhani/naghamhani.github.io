"use client";
import { createElement, type ElementType, type ReactNode } from "react";
import { useReveal } from "../useReveal";

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }: RevealProps) {
  const [ref, shown] = useReveal();
  return createElement(
    Tag,
    { ref, className: `reveal ${shown ? "in" : ""} ${className}`, style: { transitionDelay: `${delay}s` }, ...rest },
    children
  );
}
